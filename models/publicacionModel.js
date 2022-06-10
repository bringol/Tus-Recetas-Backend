var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var PublicacionSchema = new mongoose.Schema({
    recetas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Receta"
        }
    ],
    calificacion: String,
    usuarioPublicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    },

    {
        timestamps: true,
    }
)

PublicacionSchema.plugin(mongoosePaginate)
const Publicacion = mongoose.model('Publicacion', PublicacionSchema)

module.exports = Venta;