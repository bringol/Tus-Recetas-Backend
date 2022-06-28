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
// @route   PUT /api/users/update/
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  let password=req.body.password
  let newPassword=null

  const user= await User.findById(userid)
  console.log("en el servicio",user)
        //.then((user) => {
          if (user.password !== password) {
            const salt = bcrypt.genSaltSync(10);
            newPassword = bcrypt.hashSync(password, salt);
    
            password = newPassword;
            console.log(newPassword);
          }
         // return password;
// I am returning the password to be able to pass it to the next then() and 
// use it as follows
        
        //.then((password) => {
          const updatedUser= await User.findByIdAndUpdate(
            userid,
            {
              password,              
            },
            { new: true }
          )
            .then((response) => {
              console.log("response after update", response);
              res.status(200).json({ message: `User ${userid} has been updated` });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(500)
                .json({ message: "Something went wrong updating the user" });
            });
        //});
    

})

exports.editarUser = async function (usuario) {
    
  //var id = {email: usuario.email}

  //var userAnterior = await User.findOne(id);
  const userAnterior= await User.find( {email: `${usuario.email}` } )
  //const {usuario}=req.body
  console.log(userAnterior.id)
  
  
  if (userAnterior.length===0) 
      return false;

      // else
      // {
      //    const userAnterior= await User.findOne(busqueda.id);
      // }
      
  
  if(usuario.nombre !==null){
    userAnterior.nombre = usuario.nombre
    console.log(userAnterior.nombre)
    //console.log(userAnterior)
  }

  if(usuario.apellido!==null)
    userAnterior.apellido = usuario.apellido

  if(usuario.telefono!==null)
    userAnterior.telefono = usuario.telefono
  
    //console.log(userAnterior)
  try {
    const usuarioGuardado = await userAnterior.save()
      return usuarioGuardado;
  } catch (e) {
    console.log(userAnterior)
      throw Error("And Error occured while updating the User");
  }
}



exports.updateUser2 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id) //id del usr
  console.log(user)



// Chequeo user
if (user===null) {
  res.status(401)
  throw new Error('Usr no encontrado')
}
if (!req.body.password===null)
//en caso de aplicarse, hago que el password lo guarde con hash
{
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    //user.telefono=req.body.telefono
    //req.body.telefono
    req.body.password= hashedPassword
    const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body.password, {
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

exports.editarUser = async function (usuario) {
    
  var id = {email: usuario.email}

  //var userAnterior = await User.findOne(id);
  //const userAnterior= await User.find( {email: `${usuario.email}` } )
  //const {usuario}=req.body
  // console.log(userAnterior.id)
  
  
  // if (userAnterior.length===0) 
  //     return false;

      // else
      // {
      //    const userAnterior= await User.findOne(busqueda.id);
      // }
      
   try {
        var userAnterior = await User.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Receta")
    }
    
  if(usuario.nombre !==null){
    userAnterior.nombre = usuario.nombre
    console.log(userAnterior.nombre)
    //console.log(userAnterior)
  }

  if(usuario.apellido!==null)
    userAnterior.apellido = usuario.apellido

  if(usuario.telefono!==null)
    userAnterior.telefono = usuario.telefono
  
    //console.log(userAnterior)
  try {
    const usuarioGuardado = await userAnterior.save()
      return usuarioGuardado;
  } catch (e) {
    console.log(userAnterior)
      throw Error("And Error occured while updating the User");
  }
}

/*
    fuente: https://youtu.be/OEdPH4fV7vY?t=7711
    busca solo por el nombre
*/ 

exports.buscarUser = async function (req,res) {
    try {
        

        //let usuario= await User.find( {$match : {email: "fer@gmail.com" } } )
        //let usuario= await User.find( { $text: {$search: req.body.email} } )
        //let usuario= await User.find( {email:{ $regex: `^${req.body.email}`}})
        //let usuario= await User.find( {email: "fer@gmail.com" } )

        //source https://stackoverflow.com/questions/43779319/mongodb-text-search-exact-match-using-variable
        let usuario= await User.find( {email: `${req.body.email}` } )


       if(usuario.length===0)
        //console.log("vacio")
        return res.status(400).json({status: 401, data: null, message:"No existe"})
        //return(false)
        
       else
        return res.status(201).json(usuario)
        //return(usuario)

    } catch (e) {
      return res.status(400).json({status: 400, message: e.message})
      //throw Error("Ocurrió un error en la busqueda email");
    }
}


// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser3 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id) //id del usr


// Check for user
if (!req.user) {
  res.status(401)
  throw new Error('User not found')
}

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //si no existe lo crea
  })

  res.status(200).json(updatedUser)
})





