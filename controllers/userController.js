var userService = require('../services/userService');
//testing
// const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')


exports.createUser = async function(req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    console.log("body", req.body)
    var User = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password
    }
    
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await userService.registerUser(User)
        return res.status(201).json({ createdUser, message: "Succesfully Created User" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        //console.log(e)
        return res.status(400).json({ status: 400, message: e.message })
    }
}

// exports.updatePassword = async function(req, res, next) {

//     console.log("llegue al controller", req.body)
    
//      try {
//         var updatedUser = await userService.updateUser(req,res)
        
//         //return res.status(200).json( "Succesfully Updated Password", updatedUser )
//     } catch (e) {
//         return res.status(400).json({ status: 400., message: e.message })
//     }
// }

exports.editarUser = async function (req, res, next) {

    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Email be present"})
    }

    var User = {
        nombre: req.body.nombre ? req.body.nombre : null,
        apellido: req.body.apellido ? req.body.apellido : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        email: req.body.email
    }
    try {
        var userActualizado = await userService.editarUser(User)
        return res.status(200).json({status: 200, data: userActualizado, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.editarPassword = async function (req, res, next) {

    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Email be present"})
    }

    var User = {
        password: req.body.password ? req.body.password : null,
        email: req.body.email
    }
    try {
        var userActualizado = await userService.editarPassword(User)
        return res.status(200).json({
            status: 200,
            data: userActualizado, 
            message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}



exports.loginUser = async function(req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body", req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    
    try {
        // Calling the Service function with the new object from the Request Body
        //var loginUser = await userService.loginUser(req, res);
        var loginUser = await userService.loginUser(User);
        return res.status(201).json({ loginUser, message: "Login Exitoso" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Usuario o contraseña inválida" })
    }
}

exports.getUserByToken = async (req, res) => {
    res.status(200).json(req.user)
  }

  exports.getUserByEmail = async (req, res) => {
    const {email}=await User.findById(req.user.email)
    res.status(200).json(req.user)
  }