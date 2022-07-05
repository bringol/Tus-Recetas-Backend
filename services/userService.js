const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const nodemailer=require("nodemailer")


// @desc    Registrar usr nuevo
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (usr) => {
  const { nombre, apellido, telefono, email, password } = usr

  if (!nombre || !apellido || !telefono || !email || !password) {
    res.status(400)
    throw new Error('Completar todos los campos')
  }

  // Chequeo si el usuario existe
  const userExists = await User.findOne({ email })

  if (userExists) {
    //res.status(400)
    throw new Error('Ya existe correo electrónico ')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(usr.password, salt)

  // Creacion de user
  const user = await User.create({
    nombre:usr.nombre,
    apellido:usr.apellido,
    telefono:usr.telefono,
    email:usr.email,
    password: hashedPassword,
  })

  if (user) {
    //console.log("Bien")
    // res.status(201).json({
    //   _id: user.id,
    // //   nombre: user.nombre,
    // //   apellido: user.apellido,
    // //   telefono: user.telefono,
    // //   email: user.email,
    //   token: generateToken(user._id),
    // })

    var token= generateToken(user.id)
    return{token:token,user:user}

  } else {
    res.status(400)
    throw new Error('Datos de usuario inválidos')
  }
})

// @desc    Autenticar un usr
// @route   POST /api/users/login
// @access  Public
exports.loginUser = asyncHandler(async (userlogin) => {
  const { email, password } = userlogin

  // Chequeo mediante email de usr
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {

    var token= generateToken(user.id)
    return{token:token,user:user}


  } else {
    //res.status(400)
    throw new Error('Credenciales inválidas')
  }
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json("req.user.email")
})

// Genera JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
}

// @desc    Editar info perfil usr
// @route   PUT /api/users/editar/perfil
// @access  Private
exports.editarUser = async function (usuario) {
    
  var id = {email: usuario.email}
      
   try {
        var userAnterior = await User.findOne(id);
    } catch (e) {
        throw Error("Ocurrió un error en la busqueda del usuario")
    }
    
  if(usuario.nombre !==null && (usuario.nombre!==userAnterior.nombre) ){
    userAnterior.nombre = usuario.nombre
    console.log(userAnterior.nombre)
    //console.log(userAnterior)
  }

  if(usuario.apellido!==null && (usuario.apellido!==userAnterior.apellido))
    userAnterior.apellido = usuario.apellido
    console.log(userAnterior.apellido)

  if(usuario.telefono!==null && (usuario.telefono!==userAnterior.telefono))
    userAnterior.telefono = usuario.telefono
    console.log(userAnterior.telefono)
  
    //console.log(userAnterior)
  try {
    const usuarioGuardado = await userAnterior.save()
      return usuarioGuardado;
  } catch (e) {
    console.log(userAnterior)
      throw Error("Ocurrió un error en la actualizacion del usuario");
  }
}


// @desc    Editar contraseña usr
// @route   PUT /api/users/editar/password
// @access  Private
exports.editarPassword = async function (usuario) {
    
  var id = {email: usuario.email}
      
   try {
        var userAnterior = await User.findOne(id);
        //console.log("antes",userAnterior.password)
    } catch (e) {
        throw Error("Ocurrió un error en la busqueda del usuario")
    }
    
  if(usuario.password !==null){
    var hashedPassword = bcrypt.hashSync(usuario.password, 8);
    usuario.password=hashedPassword
    userAnterior.password = usuario.password
    //console.log("despues",userAnterior.password)
    //console.log(userAnterior)
  }

  try {
    const usuarioGuardado = await userAnterior.save()
      return usuarioGuardado;
  } catch (e) {
    //console.log(userAnterior)
      throw Error("Ocurrió un error mientras en la actualizacion del usuario");
  }
}


exports.olvidoPassword= async function (req,res) {
//source https://www.youtube.com/watch?v=NOuiitBbAcU
  const email=req.body.email
  User.findOne({email})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"User dont exists with that email"})
      }
      const token=jwt.sign({_id: user._id}, process.env.RESET_PASS_KEY)
      user.resetToken = token
      user.expireToken = Date.now() + 360000
      user.save().then((result)=>{
          //parámetros nodemailer
          const transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
              user:`${process.env.NODEMAILER_USER}`,
              pass:`${process.env.NODEMAILER_PASS}`,
            },
          });
          //conenido del mail
          const mailOptions={
          from:`${process.env.NODEMAILER_USER}`,
          to:`${email}`,
          subject: "Tus-Recetas: Olvido de Contraseña ",
          html: `<h2>Está recibiendo esto porque Ud. (o alguien más) pidió un cambio de contraseña para esta cuenta.</h2><br>
                 <h2>Si Ud. no pidió un cambio de contraseña, por favor ignore el email y su contraseña no cambiará.<h2><br>
                 <h3>${process.env.URL_FRONT}/reset/${token}</h3>
                `   
          }
          transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
              //res.status(401).send(error.message)
              throw Error(error.message)
            }else{
              //console.log("mail enviado exitosamente")
              //return(token)
              res.status(200).json("mail enviado exitosamente a: "+`${email}`)
            }
          })
      })

  })

}

exports.reinicioPassword = async function (req,res) {
  //fuente https://www.youtube.com/watch?v=MfqyFcP6hTY&list=PLB97yPrFwo5g0FQr4rqImKa55F_aPiQWk&index=50&t=294s
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,10).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then(()=>{
               res.json({message:"password update success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
}




exports.envioMail = async function(email){
  const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
      user:`${process.env.NODEMAILER_USER}`,
      pass:`${process.env.NODEMAILER_PASS}`,
    },
  });

  const mailOptions={
    from:`${process.env.NODEMAILER_USER}`,
    to:`${email}`,
    subject: "Tus-Recetas: Olvido de Contraseña ",
    //text:"Tu nueva constraseña es: "+`${password}`,
    text:
    "Está recibiendo esto porque Ud. (o alguien más) pidió un cambio de contraseña para esta cuenta.\n\n"
    + "Por favor, seleccione el siguiente enlace, o cópielo en un navegador para completar el proceso a la hora de haberlo recibido:\n\n"
    + `http://localhost:3000/reset/${token}\n\n`
    +"Si Ud. no pidió un cambio de contraseña, por favor ignore el email y su contraseña no cambiará.\n"
  }
  //enviamos el mail
  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
      res.status(401).send(error.message)
    }else{
      console.log("mail enviado")
      res.status(200).json(req.body)
    }


  })
} 


/********************************************************* */
exports.buscarUser = async function (req,res) {
    try {

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



// //-----------
// // @desc    Update user
// // @route   PUT /api/users/:id
// // @route   PUT /api/users/update/
// // @access  Private
// exports.updateUser = asyncHandler(async (req, res) => {
//   const { userid } = req.params;
//   let password=req.body.password
//   let newPassword=null

//   const user= await User.findById(userid)
//   console.log("en el servicio",user)
//         //.then((user) => {
//           if (user.password !== password) {
//             const salt = bcrypt.genSaltSync(10);
//             newPassword = bcrypt.hashSync(password, salt);
    
//             password = newPassword;
//             console.log(newPassword);
//           }
//          // return password;
// // I am returning the password to be able to pass it to the next then() and 
// // use it as follows
        
//         //.then((password) => {
//           const updatedUser= await User.findByIdAndUpdate(
//             userid,
//             {
//               password,              
//             },
//             { new: true }
//           )
//             .then((response) => {
//               console.log("response after update", response);
//               res.status(200).json({ message: `User ${userid} has been updated` });
//             })
//             .catch((err) => {
//               console.log(err);
//               res
//                 .status(500)
//                 .json({ message: "Something went wrong updating the user" });
//             });
//         //});
    

// })





