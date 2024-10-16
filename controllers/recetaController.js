var recetaService = require('../services/recetaService');

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

exports.obtenerRecetaMail = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 8;
    let filtro= {email: req.body.email}
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
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        dificultad: req.body.dificultad,
        ingredientes: req.body.ingredientes,
        procedimiento: req.body.procedimiento,
        email: req.body.email,
        autor: req.body.autor,
        nombreImagen: req.body.nombreImagen
    }
    try {
            var recetaCreada = await recetaService.crearReceta(Receta)
        return res.status(201).json({recetaCreada, message: "Succesfully Created Receta"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Receta Creation was Unsuccesfull"})
    }
}

exports.editarReceta = async function (req, res, next) {

    if (!req.body.id) {
        console.log("status: 400., message: Id be present");
    }

    var Receta = {
        _id: req.body._id ? req.body._id : null, //por el cliente
        nombre: req.body.nombre ? req.body.nombre : null,
        categoria: req.body.categoria ? req.body.categoria : null,
        dificultad: req.body.dificultad ? req.body.dificultad : null,
        ingredientes: req.body.ingredientes ? req.body.ingredientes : null,
        procedimiento: req.body.procedimiento ? req.body.procedimiento : null,
    }
    console.log("receta")
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
        return res.status(201).json({status: 201, data: id, message: "Succesfully Deleted"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.calificarReceta = async function (req, res, next) {

    console.log("llega al controller del back")


    var Calificacion = {
        idReceta: req.body.idReceta ? req.body.idReceta : null ,
        autor: req.body.autor ? req.body.autor : null ,
        calificacion: req.body.calificacion ? req.body.calificacion : null 
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

exports.buscarReceta = async function (req, res, next) {
    console.log(req.body)
    try {

        let receta = await recetaService.buscarReceta(req, res)
        return res.status(200).json({status: 200, data: receta, message: "Succesfully Recetas Recieved"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}