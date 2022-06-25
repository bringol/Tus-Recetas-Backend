const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const calificacionSchema = mongoose.Schema(
  {
    idReceta: String,
    calificacion: Number,
    autor: String,
    date: Date
  })

calificacionSchema.plugin(mongoosePaginate)
const Calificacion = mongoose.model('Calificacion', calificacionSchema)
module.exports = Calificacion