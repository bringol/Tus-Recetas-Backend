const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const recetaSchema = mongoose.Schema(
  {
    nombre: String,
    categoria: String,
    dificultad: String,
    ingredientes: String,
    procedimiento: String, 
    calificacionPromedio: Number,
    calificacionTotal: Number,
    usuariosTotales: Number,
    date: Date,
    autor: String,
    email: String, //para el listado de recetas publicadas
    nombreImagen: String, //URL Imagen
  }, {versionKey: false}
)

//hace falta crear un index para poder realizar la busq
recetaSchema.index({name:"text"})

recetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', recetaSchema)
module.exports = Receta
