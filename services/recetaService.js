var Receta = require('../models/recetaModel');
const mongoose = require('mongoose');
const Calificacion = require('../models/calificacionModel');

_this = this

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dra23scwx',
    api_key: '217332742699955',
    api_secret: 'oY0LvAvHMUm-HUhtkPj6wqvKgPE'
});

exports.obtenerRecetas = async function (query, page, limit) {

    var options = {
        page,
        limit
    }

    try {
        console.log("Query", query)
        var Recetas = await Receta.paginate(query, options)
        return Recetas;

    } catch (e) {
        console.log("error services", e)
        throw Error('Error while Paginating Recetas');
    }
}

exports.crearReceta = async function (receta) {

    console.log("Receta a Agregar", receta);
    let imagen = process.env.UPLOAD_DIR + receta.nombreImagen;
    cloudinary.uploader.upload(imagen, function (result) {  //subo imagen a cloudinary
        console.log("Resultado", result);
        var newReceta = new Receta({ //creo receta
            nombre: receta.nombre,
            categoria: receta.categoria,
            dificultad: receta.dificultad,
            ingredientes: receta.ingredientes,
            procedimiento: receta.procedimiento,
            calificacionPromedio: 0,
            calificacionTotal: 0,
            usuariosTotales: 0,
            date: new Date(),
            email: receta.email,
            autor: receta.autor,
            nombreImagen: result.url, //URL de la imagen            

        })
        guardarReceta(newReceta)
    });
}

async function guardarReceta(newReceta) { //guardo receta en Mongo
    try {
        var recetaGuardada = await newReceta.save();
        return recetaGuardada;
    } catch (e) {
        console.log(e)
        throw Error("Error while Creating Imagen User")
    }
}

exports.editarReceta = async function (receta) {
    let id = { _id: receta._id }

    try {
        var recetaAnterior = await Receta.findOne(id);
        console.log("el id", id)
        //var recetaAnterior = await Receta.findOne({ _id: receta.id });
        //similar o equivalente a find({name: receta.name})r
    } catch (e) {
        throw Error("Error occured while Finding the Receta")
    }
    if (!recetaAnterior)
        throw Error('La receta no existe');

    if (receta.nombre !== null)
        recetaAnterior.nombre = receta.nombre

    if (receta.categoria !== null)
        recetaAnterior.categoria = receta.categoria

    if (receta.dificultad !== null)
        recetaAnterior.dificultad = receta.dificultad

    if (receta.ingredientes !== null)
        recetaAnterior.ingredientes = receta.ingredientes

    if (receta.procedimiento !== null)
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
        var deleted = await Receta.remove({
            _id: id
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
    var id = { _id: idReceta }

    calificacion = +`${calificacion}`

    try {
        var recetaAnterior = await Receta.findOne(id);

        const suma = recetaAnterior.calificacionTotal + calificacion
        const cont = recetaAnterior.usuariosTotales + 1
        
        recetaAnterior.calificacionTotal = suma
        recetaAnterior.usuariosTotales = cont
        recetaAnterior.calificacionPromedio = (suma / cont).toFixed(0)

    } catch (e) {
        throw Error("Error occured while Finding the Receta")
    }
    if (!recetaAnterior) {
        return false;
    }
    try {
        var recetaGuardada = await recetaAnterior.save()
        console.log("calif actual", calificacion)
        console.log("calif total", recetaGuardada.calificacionTotal)
        console.log("cant votos", recetaGuardada.usuariosTotales)
        console.log("calif prom", recetaGuardada.calificacionPromedio)
        return recetaGuardada;
    } catch (e) {
        throw Error("And Error occured while updating the Receta");
    }
}


// @desc POST /buscar
// @route   POST /api/recetas
exports.buscarReceta = async function (req) {

    try {
console.log(req.body)
        let receta = await Receta.find({

            nombre: { $regex: req.body.nombre, $options: 'i' },
            categoria: { $regex: req.body.categoria, $options: 'i' },
            dificultad: { $regex: req.body.dificultad, $options: 'i' },
            //ingredientes:{$in: [req.body.ingredientes,req.body.ingredientes,req.body.ingredientes,req.body.ingredientes,req.body.ingredientes,req.body.ingredientes]}
            ingredientes: { $regex: req.body.ingredientes, $options: 'i' },
            calificacion: { $regex: req.body.calificacion, $options: 'i' },
        })
        return (receta)
    } catch (e) {
        return (e)
    }

}

exports.obtenerRecetasFiltros = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        console.log("Query", query)
        var Recetas = await Receta.find.paginate({query, options,
            nombre: { $regex: req.body.nombre, $options: 'i' },
            categoria: { $regex: req.body.categoria, $options: 'i' },
            dificultad: { $regex: req.body.dificultad, $options: 'i' },
            ingredientes: { $regex: req.body.ingredientes, $options: 'i' },
            calificacion: { $regex: req.body.calificacion, $options: 'i' },
        })
        return Recetas;
    } catch (e) {
        console.log("error services", e)
        throw Error('Error while Paginating Recetas');
    }
}






