var userService = require('../services/userService');
//testing
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


exports.createUser = async function(req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await userService.registerUser(req,res)
        //return res.status(201).json({ createdUser, message: "Succesfully Created User" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.updateUser = async function(req, res, next) {

    console.log("llegue al controller", req.body)
    
     try {
        var updatedUser = await userService.updateUser(req,res)
        
        return res.status(200).json( "Succesfully Updated User" )
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}



exports.loginUser = async function(req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body", req.body)
    
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await userService.loginUser(req, res);
        //return res.status(201).json({ loginUser, message: "Succesfully login" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Usuario o contraseña invalido" })
    }
}

exports.getUserByToken = async (req, res) => {
    res.status(200).json(req.user)
  }

  exports.getUserByEmail = async (req, res) => {
    const {email}=await User.findOne({_id:req.user.email})
    res.status(200).json(req.user)
  }