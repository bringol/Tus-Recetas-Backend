var Receta = require('../models/recetaModel');
const mongoose = require('mongoose');
const Calificacion = require('../models/calificacionModel');


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
        //similar o equivalente a find({name: receta.name})
    } catch (e) {
        throw Error("Error occured while Finding the Receta")
    }
    if (!recetaAnterior) 
        return false;
    
    if(receta.name !==null)
        recetaAnterior.name = receta.name

    if(receta.categoria!==null)
        recetaAnterior.categoria = receta.categoria

    if(receta.dificultad!==null)
        recetaAnterior.dificultad = receta.dificultad

    if(receta.ingredientes!==null)
        recetaAnterior.ingredientes = receta.ingredientes

    if(receta.procedimiento!==null)
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
//Deprecated
// exports.buscarReceta = async function (req, res, next) {
//     try {
//         //el campo que recibirá del query
//         let termino = req.body.termino
//         //el query
//         let receta= await Receta.find( { $text: {$search: termino, $diacriticSensitive: true } } )
//         return(receta)
//     } catch (e) {
//         return (e)
//     }
// }

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

    console.log("entra al service")
  
    var newCalificacion = new Calificacion({
        idReceta: calificacion.idReceta,
        calificacion: calificacion.calificacion,
        autor: calificacion.autor,
        date: new Date(),
    })
    console.log("new calificacion", newCalificacion)
    try {
       
        await newCalificacion.save();
        
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Receta")
    }
}

exports.actualizarPromedio = async function (idReceta, calificacion) {
    
    console.log("entra al service promedio")
    var id = {idReceta}

    calificacion = +`${calificacion}`

    try {
        var recetaAnterior = await Receta.findOne(id);
        const suma = recetaAnterior.calificacionTotal + calificacion
        const cont = recetaAnterior.usuariosTotales + 1
        console.log("calif total", recetaAnterior.calificacionTotal)
        recetaAnterior.calificacionTotal = suma
        recetaAnterior.usuariosTotales = cont
        recetaAnterior.calificacionPromedio = (suma/cont).toFixed(0)
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


// @desc POST /buscar
// @route   POST /api/recetas
exports.buscarReceta = async function (req) {

    try {
       
       let receta=await Receta.find( {
        
        name:{ $regex: req.body.name, $options: 'i'},
        categoria:{ $regex: req.body.categoria, $options: 'i'},
        dificultad:{ $regex: req.body.dificultad, $options: 'i'},
        //ingredientes:{$regex: /harina/, $options: 'i'}
        //ingredientes:{$regex: req.body.ingredientes, $options: 'i'}
        //ingredientes:{$in: ["agua","ricota"]}
        ingredientes:{$in: [req.body.ingredientes,req.body.ingredientes,req.body.ingredientes,req.body.ingredientes,req.body.ingredientes,req.body.ingredientes]}
        //mayusc, minsusc y diacriticos para ingredientes?
        })
        //revisar manejador de errores caso datos invalidos
        return(receta)
    } catch (e) {
        return (e)
    }

}



        
        

