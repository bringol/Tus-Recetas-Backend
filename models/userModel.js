const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const userSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'Completar el campo nombre'],
    },
    apellido:{
      type:String,
      required: [true, 'Completar el campo apellido'],
    },
    telefono:{
      type:String,
      required: [true, 'Completar el campo teléfono'],
    },
    email: {
      type: String,
      required: [true, 'Completar el campo de correo electrónico '],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Completar el campo de contraseña'],
    },

  },
  {
    timestamps: true,
  }
)

userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', userSchema)
