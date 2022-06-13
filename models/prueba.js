import ComputadorasDAO from "../dao/computadorasDAO.js";

export default class ComputadorasController {
    static async apiGetComputadoras(req, res, next){
        const computadorasPorPagina = req.query.computadorasPorPagina ? parseInt(req.query.computadorasPorPagina, 10) : 20
        const pagina = req.query.pagina ? parseInt(req.query.pagina, 10) : 0

        let filters = {}  //Definir filtros en base a documento JSON
        if (req.query.description){
            filters.description = req.query.description
        }
        else if  (req.query.brand){
            filters.brand = req.query.brand
        }
        else if (req.query.price){
            filters.minPrice = req.query.price.minPrice
            filters.maxPrice = req.query.price.maxPrice
        }
        else if (req.query.RAM){
            filters.RAM = req.query.RAM
        }
        else if (req.query.name ){
            filters.name = req.query.name
        }


        const {computadorasList, totalNumComputadoras} = await ComputadorasDAO.getComputadoras({
            filters,
            pagina,
            computadorasPorPagina,
        })

        let response = {
            computadoras: computadorasList,
            pagina: pagina,
            filters: filters,
            entries_por_pagina: computadorasPorPagina,
            total_resultados: totalNumComputadoras,
        }
        res.json(response)
    }

    static async apiGetComputadoraById(req, res, next){
        try{
            let id = req.params.id || {}
            let computadora = await ComputadorasDAO.getComputadoraByID(id)
            if (!computadora){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(computadora)
        }
        catch (e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

}


import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let computadoras

export default class ComputadorasDAO {
    static async injectDB(conn){
        if (computadoras){
            return
        }
        try {
            computadoras = await conn.db(process.env.RESTREVIEWS_NS).collection("computadoras")
        }
        catch (e){
            console.error(
                `Unable to establish a connection handle in computadorasDAO: ${e}`,
            )
        }
    }

    static async getComputadoras({
        filters = null,
        pagina = 0,
        computadorasPorPagina = 20,
    } = {}) {
        let query
        if (filters){ //Agregar un "and" de filtros a la query
            if  ("brand" in filters){
                query = {"brand": {$eq: filters["brand"]}}
            }
            else if ("minPrice" in filters && "maxPrice" in filters){
                query = {"price": {$lte: filters["maxPrice"], $gte: filters["minPrice"]}}
            }
            else if ("RAM" in filters){
                query = {"RAM": {$eq: filters["RAM"]}}
            }
            else if ("description" in filters){
                query = {"description": {$eq: filters["description"]}}
            }
            else if ("name" in filters){
                query = {"name": {$eq: filters["name"]}}
            }
        }

        let cursor

        try {
            cursor = await computadoras.find(query)
        }
        catch (e){
            console.error(`Unable to issue find command, ${e}`)
            return {computadorasList: [], totalNumComputadoras: 0}
        }

        const displayCursor = cursor.limit(computadorasPorPagina).skip(computadorasPorPagina * pagina)

        try {
            const computadorasList = await displayCursor.toArray()
            const totalNumComputadoras = await computadoras.countDocuments(query)
            return {computadorasList, totalNumComputadoras}
        }
        catch (e){
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {computadorasList: [], totalNumComputadoras: 0}
        }
    }

    static async getComputadoraByID(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                    {
                        $lookup: {
                            from: "comentarios",
                            let: {
                                id: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$computadora_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "comentarios",
                        },
                    },
                    {
                        $addFields: {
                            comentarios: "$comentarios",
                        },
                    },
            ]
            return await computadoras.aggregate(pipeline).next()
        }
        catch (e){
            console.error(`Something went wrong in getComputadoraByID: ${e}`)
            throw e
        }
    }

}