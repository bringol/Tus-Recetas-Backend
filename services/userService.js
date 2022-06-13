const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Registrar usr nuevo
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { nombre, apellido, telefono, email, password } = req.body

  if (!nombre || !apellido || !telefono || !email || !password) {
    res.status(400)
    throw new Error('Completar todos los campos')
  }

  // Chequeo si el usuario existe
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Usuario ya existe')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Creacion de user
  const user = await User.create({
    nombre,
    apellido,
    telefono,
    email,
    password: hashedPassword,
  })

  if (user) {
    //console.log("Bien")
    res.status(201).json({
      _id: user.id,
    //   nombre: user.nombre,
    //   apellido: user.apellido,
    //   telefono: user.telefono,
    //   email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Datos de usuario inválidos')
  }
})

// @desc    Autenticar un usr
// @route   POST /api/users/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Chequeo mediante email de usr
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
       _id: user.id,
    //   nombre: user.nombre,
    //   apellido: user.apellido,
    //   telefono: user.telefono,
    //   email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Credenciales inválidas')
  }
})



// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Genera JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
}

//-----------
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id) //id del usr


// Chequeo user
if (!req.user) {
  res.status(401)
  throw new Error('Usr no encontrado')
}
if (!req.body.password===null)
//en caso de aplicarse, hago que el password lo guarde con hash
{
    var hashedPassword = bcrypt.hashSync(user.password, 8);
req.body.password= hashedPassword
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //si no existe lo crea
  })
}
else
    //console.log("el email no se cambia")
    {
        res.status(400)
        throw new Error('Datos de usuario inválidos')
      }   
  //res.status(200).json(updatedUser)
})






