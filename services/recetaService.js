var Receta = require('../models/recetaModel');

_this = this

exports.obtenerRecetas = async function (query, page, limit) {

    var options = {
        page,
        limit
    }

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
        procedimiento: receta.procedimiento
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

//ERROR
exports.eliminarReceta = async function (id) {

    try {
        var recetaEliminada = await Receta.deleteOne({
            "_id": ObjectID(id)
        })
        if (recetaEliminada.n === 0 && recetaEliminada.ok === 1) {
            throw Error("Receta Could not be deleted")
        }
        //console.log("eliminada", recetaEliminada)
        return recetaEliminada;
        
    } catch (e) {
        throw Error("Error Occured while Deleting the Receta")
    }
}