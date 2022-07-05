var userService = require('../services/userService');
//testing
// const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')


exports.createUser = async function(req, res, next) {
    // Req.Body contains the form submit values.
    //console.log("llegue al controller", req.body)
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
        return res.status(201).json({ createdUser, message: "Creacion exitosa de usuario" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        //console.log(e)
        return res.status(400).json({ status: 400, message: e.message })
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

exports.editarUser = async function (req, res, next) {

    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Email debe estar presente"})
    }

    var User = {
        nombre: req.body.nombre ? req.body.nombre : null,
        apellido: req.body.apellido ? req.body.apellido : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        email: req.body.email
    }
    try {
        var userActualizado = await userService.editarUser(User)
        return res.status(200).json({status: 200, data: userActualizado, message: "Usuario actualizado exitorsamente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.editarPassword = async function (req, res, next) {

    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Email debe estar presente"})
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

exports.getUserByToken = async (req, res) => {
    
    try{
    res.status(200).json(req.user.email)
    }
    catch(e){
        return res.status(400).json({status: 400., message: "e.message"})
    }

  }

exports.getUserByEmail = async (req, res) => {
    const {email}=await User.findById(req.user.email)
    res.status(200).json(req.user.email)
  }


//**///// */
exports.olvidoPassword = async function (req, res, next) {

    if (!req.body.email) {
        return res.status(400).json({status: 400, message: "Email debe estar presente"})
    }

    var User = {
        email: req.body.email
    }
    try {
        await userService.olvidoPassword(User,res)
        //return envio
        return res.status(200).json({status: 200, message: "Correo enviado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.reinicioPassword = async function (req, res, next) {

    if (!req.body.token) {
        return res.status(400).json({status: 400, message: "Token debe estar presente"})
    }

    var User = {
        token: req.body.token,
        password: req.body.password
    }
    try {
        await userService.reinicioPassword(User,res)
        return res.status(200).json({status: 200, message: "Contraseña reiniciada exitosamente"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
