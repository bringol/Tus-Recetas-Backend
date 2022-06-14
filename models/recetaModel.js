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

//hace falta crear un index para poder realizar la busq
recetaSchema.index({name:"text"})//en este caso es solo para el nombre
//agrego los otros campos por separado para la parte de filtros
recetaSchema.index({ingredientes:"text"})
recetaSchema.index({categoria:"text"})
recetaSchema.index({dificultad:"text"})

recetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', recetaSchema)
module.exports = Receta
