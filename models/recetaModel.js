const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const recetaSchema = mongoose.Schema(
  {
    name: String,
    categoria: String,
    dificultad: String,
    ingredientes: Array,
    procedimiento: String, 
    calificacion: Number,
    date: Date,
    autor: String,

  }, {versionKey: false}
)

recetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', recetaSchema)
module.exports = Receta
