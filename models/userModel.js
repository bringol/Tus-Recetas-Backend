const mongoose = require('mongoose')

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

module.exports = mongoose.model('User', userSchema)
