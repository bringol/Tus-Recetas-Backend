var recetaService = require('../services/recetaService');

_this = this;

exports.obtenerRecetas = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

        try {
        var Recetas = await recetaService.obtenerRecetas({}, page, limit)
        return res.status(200).json({status: 200, data: Recetas, message: "Succesfully Recetas Recieved"});
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
        procedimiento: req.body.procedimiento
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

    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    var Receta = {
       
        name: req.body.name ? req.body.name : null,
        categoria: req.body.categoria ? req.body.categoria : null,
        dificultad: req.body.dificultad ? req.body.dificultad : null,
        ingredientes: req.body.ingredientes ? req.body.ingredientes : null,
        procedimiento: req.body.procedimiento ? req.body.procedimiento : null
    }
    try {
        var recetaActualizada = await recetaService.editarReceta(Receta)
        return res.status(200).json({status: 200, data: recetaActualizada, message: "Succesfully Updated Receta"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

//ERROR
exports.eliminarReceta = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await recetaService.eliminarReceta(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


    
    
