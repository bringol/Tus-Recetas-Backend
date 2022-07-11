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
    nombreImagen: String, //URL Imagen
  }, {versionKey: false}
)

//hace falta crear un index para poder realizar la busq
recetaSchema.index({nombre:"text"})//en este caso es solo para el nombre
//agrego los otros campos por separado para la parte de filtros EDIT: al parecer solo puede haber 1 index
//Index con todos los filtros (testear)
// recetaSchema.index({
//   nombre:"text",
//   //ingredientes:"array",
//   categoria:"text" ,
//   dificultad:"text"})


recetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', recetaSchema)
module.exports = Receta
