const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;
//mongoose.Schema

const recetaSchema = new Schema(
  {
    
    //_id: Schema.Types.ObjectId,
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
    email: String, 
    nombreImagen: String, //URL Imagen
  }, {versionKey: false}
)

recetaSchema.index({name:"text"})

recetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', recetaSchema)
module.exports = Receta
