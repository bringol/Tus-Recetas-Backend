var recetaService = require('../services/recetaService');

//test
// var Receta = require('../models/recetaModel');
// const mongoose = require('mongoose');

_this = this;

exports.obtenerRecetas = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 8;

        try {
        var Recetas = await recetaService.obtenerRecetas({}, page, limit)
        return res.status(200).json({status: 200, data: Recetas, message: "Succesfully Recetas Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.obtenerRecetaID = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 8;
    let filtro= {_id: req.params.id}
    try {
        var Producto = await recetaService.obtenerRecetas(filtro, page, limit)
        return res.status(200).json({status: 200, data: Producto, message: "Succesfully Recieved Receta"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}


exports.crearReceta = async function (req, res, next) {

    console.log("llegue al controller",req.body)
    var Receta = {
        name: req.body.name,
        categoria: req.body.categoria,
        dificultad: req.body.dificultad,
        ingredientes: req.body.ingredientes,
        procedimiento: req.body.procedimiento,
        autor: req.body.autor
    }
    try {
        if (req.body.nombreImagen!==''){ //Si tengo la imagen, creo la receta
            var recetaCreada = await recetaService.crearReceta(Receta)
        }
        return res.status(201).json({recetaCreada, message: "Succesfully Created Receta"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Receta Creation was Unsuccesfull"})
    }
}

exports.editarReceta = async function (req, res, next) {

    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }

    var Receta = {
        id: req.body.id ? req.body.id : null,
        name: req.body.name ? req.body.name : null,
        categoria: req.body.categoria ? req.body.categoria : null,
        dificultad: req.body.dificultad ? req.body.dificultad : null,
        ingredientes: req.body.ingredientes ? req.body.ingredientes : null,
        procedimiento: req.body.procedimiento ? req.body.procedimiento : null,
    }
    try {
        var recetaActualizada = await recetaService.editarReceta(Receta)
        return res.status(200).json({status: 200, data: recetaActualizada, message: "Succesfully Updated Receta"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.eliminarReceta = async function (req, res, next) {
    var id = req.body.id;
    try {
        var deleted = await recetaService.eliminarReceta(id);
        return res.status(201).json({status: 201, data: id, message: "Succesfully Deleted Producto"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

//Deprecated
// exports.buscarReceta = async function (req, res, next) {
//     try {
//         //revisar cómo hacer para paginar 
//         //https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose

//         let receta= await recetaService.buscarReceta(req,res)

//         return res.status(201).json(receta)

        
//     } catch (e) {
//         return res.status(400).json({status: 400, message: e.message})
//     }
// }

// //Deprecated
// exports.RecetaByFiltro = async function (req, res, next) {

//     // Check the existence of the query parameters, If doesn't exists assign a default value
//     var page = req.query.page ? req.query.page : 1
//     var limit = req.query.limit ? req.query.limit : 10;
//     //encontrar la forma de hacer que considere varios filtros
//     let filtro= {dificultad: req.body.dificultad, categoria:req.body.categoria}
//     try {
//         var RecetasFiltradas = await recetaService.obtenerRecetas(filtro, page, limit)
//         // Return the Users list with the appropriate HTTP password Code and Message.
//         return res.status(200).json({status: 200, data: RecetasFiltradas, message: "Succesfully Recieved"});
//     } catch (e) {
//         //Return an Error Response Message with Code and the Error Message.
//         return res.status(400).json({status: 400, message: e.message});
//     }
// }



//VER

exports.calificarReceta = async function (req, res, next) {

    /*if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    */

    var Calificacion = {
        idReceta: req.body.idReceta ? req.body.idReceta : null ,//ver
        autor: req.body.autor ? req.body.autor : null ,//ver
        calificacion: req.body.calificacion ? req.body.calificacion : null //ver
    }
   
    try {
        console.log(Calificacion)
        var crearCalificacion = await recetaService.crearCalificacion(Calificacion)
        var actualizarPromedio = await recetaService.actualizarPromedio(Calificacion.idReceta, Calificacion.calificacion)
        return res.status(200).json({status: 200, data: crearCalificacion, actualizarPromedio, message: "Succesfully Updated Receta"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}



// testing
// exports.buscarRecetaFiltro2 = async function (req, res, next) {

//     Receta.find( {
//         categoria:{ $regex: /pastas/, $options: 'i'},
//         name:{ $regex: /sorrentinos/, $options: 'i'},
//         dificultad:{ $regex: /4/, $options: 'i'},
//         ingredientes:{$regex: /harina/, $options: 'i'}
    
//     },function(err, result){

//         if(err){
//             res.send(err)
//         }
//         else{
//             res.json(result)
//         }



// })
// }

exports.buscarReceta = async function (req, res, next) {
    try {
        
       let receta= await recetaService.buscarReceta(req,res)

        return res.status(201).json(receta)

        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}