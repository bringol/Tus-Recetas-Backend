var Receta = require('../models/recetaModel');
const mongoose = require('mongoose');
const Calificacion = require('../models/calificacionModel');


_this = this

exports.obtenerRecetas = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    
    /*let query //FILTROS - VER
        if (filters){ 
            if  ("categoria" in filters){
                query = {"categoria": {$eq: filters["categoria"]}}
            }
            else if ("dificultad" in filters){
                query = {"dificultad": {$eq: filters["dificultad"]}}
            }
            else if ("ingredientes" in filters){
                query = {"ingredientes": {$eq: filters["ingredientes"]}}
            }
            else if ("calificacion" in filters){
                query = {"calificacion": {$eq: filters["calificacion"]}}
            }
        }

        let cursor //BUSCAR - VER
        try {
            cursor = await Recetas.find(query)
        }
        catch (e){
            console.error(`Unable to issue find command, ${e}`)
        }*/

    try {
        console.log("Query",query)
        var Recetas = await Receta.paginate(query, options)
        return Recetas;

    } catch (e) { 
        console.log("error services",e)
        throw Error('Error while Paginating Recetas');
    }
}

exports.crearReceta = async function (receta) {
    
    var newReceta = new Receta({
        name: receta.name,
        categoria: receta.categoria,
        dificultad: receta.dificultad,
        ingredientes: receta.ingredientes,
        procedimiento: receta.procedimiento,
        calificacionPromedio: 0,
        calificacionTotal: 0,
        usuariosTotales: 0,
        date: new Date(),
        autor: receta.autor,
    })

    try {
        await newReceta.save();
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Receta")
    }
}

exports.editarReceta = async function (receta) {
    
    var id = {name: receta.name}

    try {
        var recetaAnterior = await Receta.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Receta")
    }
    if (!recetaAnterior) {
        return false;
    }
    recetaAnterior.name = receta.name,
    recetaAnterior.categoria = receta.categoria,
    recetaAnterior.dificultad = receta.dificultad,
    recetaAnterior.ingredientes = receta.ingredientes,
    recetaAnterior.procedimiento = receta.procedimiento
    

    try {
        var recetaGuardada = await recetaAnterior.save()
        return recetaGuardada;
    } catch (e) {
        throw Error("And Error occured while updating the Receta");
    }
}

exports.eliminarReceta = async function (id) {
    try {
        var deleted = await Receta.deleteOne({
            _id: mongoose.Types.ObjectId(id)
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Receta Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Receta")
    }
}

/*
    POST /buscar
    fuente: https://youtu.be/OEdPH4fV7vY?t=7711
    busca solo por el nombre
*/ 

exports.buscarReceta = async function (req, res, next) {
    try {
        //el campo que recibirá del query
        let termino = req.body.termino
        //el query
        let receta= await Receta.find( { $text: {$search: termino, $diacriticSensitive: true } } )
        return(receta)
    } catch (e) {
        return (e)
    }
}

// exports.buscarRecetaFiltro = async function (req, res, next) {
//     try {
//         //el campo que recibirá del query
//         //let nombre = req.body.name
//         //let ingredientes = req.body.name
//         //let categoria = req.body.categoria
//         //let dificultad = req.body.dificultad

//         //el query
//         let receta= await Receta.find( {name: req.body.name } )
//         return(receta)
//     } catch (e) {
//         return (e)
//     }
// }


exports.crearCalificacion = async function (calificacion) {
  
    var newCalificacion = new Calificacion({
        idReceta: calificacion.idReceta,
        calificacion: calificacion.calificacion,
        autor: calificacion.autor,
        date: new Date(),
    })

    try {
        await newCalificacion.save();
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Receta")
    }
}

exports.actualizarPromedio = async function (idReceta, calificacion) {
    
    var id = idReceta

    try {
        var recetaAnterior = await Receta.findOne(id);
        const suma = recetaAnterior.calificacionTotal + calificacion
        const cont = recetaAnterior.usuariosTotales + 1
        recetaAnterior.calificacionPromedio = suma/cont
    } catch (e) {
        throw Error("Error occured while Finding the Receta")
    }
    if (!recetaAnterior) {
        return false;
    }
    try {
        var recetaGuardada = await recetaAnterior.save()
        return recetaGuardada;
    } catch (e) {
        throw Error("And Error occured while updating the Receta");
    }
}


