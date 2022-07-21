var userService = require('../services/userService');



exports.createUser = async function(req, res, next) {
    //Req.body contiene los valores a enviar
    console.log("body", req.body)
    var User = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password
    }
    
    try {
        var createdUser = await userService.registerUser(User)
        return res.status(201).json({ createdUser, message: "Creacion exitosa de usuario" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.loginUser = async function(req, res, next) {
    console.log("body", req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    
    try {
        var loginUser = await userService.loginUser(User);
        return res.status(201).json({ loginUser, message: "Login Exitoso" })
    } catch (e) {
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
