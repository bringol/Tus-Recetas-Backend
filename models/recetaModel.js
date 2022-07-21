const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

//mongoose.Schema
const recetaSchema = new Schema(
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

//index para poder realizar la busq
recetaSchema.index({name:"text"})

recetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', recetaSchema)
module.exports = Receta
