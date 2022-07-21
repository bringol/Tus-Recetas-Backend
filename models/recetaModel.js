const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;
//mongoose.Schema

const recetaSchema = new Schema(
  {
    
<<<<<<< HEAD
    //_id: Schema.Types.ObjectId,
=======
    // _id: Schema.Types.ObjectId,
>>>>>>> cd63c011ed0fcd1fad40d2a2b0fb815c0016771c
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
