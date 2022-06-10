// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    console.log("llegue al servicio", user)
    if (!user.nombre || !user.apellido || !user.telefono || !user.email || !user.password) {
        //res.status(400)
        console.log("Error en el servicio")
        throw new Error('Completar todos los campos')
      }
    
      // Chequeo si el usuario existe
      const userExists = await User.findOne({ email: user.email })
    
      if (userExists) {
        //res.status(400)
        console.log("Error en el servicio")
        throw new Error('Usuario ya existe')
      }
    
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(user.password, salt)
    
      // Creacion de user
      var newUser = new User({
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: user.telefono,
            email: user.email,
            password: hashedPassword,
            //token: generateToken(user._id),
        })
        try {
            // Saving the User 
            await newUser.save();
        }
     catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
    //   if (newUser) {
    //     res.status(201).json({
    //       _id: user.id,
    //       nombre: user.nombre,
    //       apellido: user.apellido,
    //       telefono: user.telefono,
    //       email: user.email,
    //       token: generateToken(user._id),
    //     })
    //   } else {
    //     res.status(400)
    //     throw new Error('Datos de usuario inválidos')
    //   }
    }


// Genera JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
//     // Creating a new Mongoose Object by using the new keyword
//     var hashedPassword = bcrypt.hashSync(user.password, 8);
    
//     var newUser = new User({
//         nombre: user.nombre,
//         apellido: user.apellido,
//         telefono: user.telefono,
//         email: user.email,
//         //date: new Date(),
//         password: hashedPassword
//     })

//     try {
//         // Saving the User 
//         var savedUser = await newUser.save();
//         var token = jwt.sign({
//             id: savedUser._id
//         }, process.env.SECRET, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         return token;
//     } catch (e) {
//         // return a Error message describing the reason 
//         console.log(e)    
//         throw Error("Error while Creating User")
//     }
// }

exports.updateUser = async (req, res) =>  {

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
    }

    //res.status(200).json(updatedUser)



    
    // var id = {email :user.email}

    // try {
    //     //Find the old User Object by the Id
    //     var oldUser = await User.findOne(id);
    // } catch (e) {
    //     throw Error("Error occured while Finding the User")
    // }
    // // If no old User Object exists return false
    // if (!oldUser) {
    //     return false;
    // }
    // //Edit the User Object
    // var hashedPassword = bcrypt.hashSync(user.password, 8);
    // oldUser.nombre = user.nombre
    // oldUser.apellido = user.apellido
    // oldUser.telefono = user.telefono
    // //oldUser.email = user.email
    // oldUser.password = hashedPassword
    // try {
    //     var savedUser = await oldUser.save()
    //     return savedUser;
    // } catch (e) {
    //     throw Error("And Error occured while updating the User");
    // }
//}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    try {
        // Find the User 
        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        var token= generateToken(user._id)
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}






    // // Creating a new Mongoose Object by using the new keyword
    // try {
    //     // Find the User 
    //     console.log("login:",user)
    //     var _details = await User.findOne({
    //         email: user.email
    //     });
    //     var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
    //     if (!passwordIsValid) throw Error("Invalid user/password")

    //     var token = jwt.sign({
    //         id: _details._id
    //     }, process.env.SECRET, {
    //         expiresIn: 86400 // expires in 24 hours
    //     });
    //     return {token:token, user:_details};
    // } catch (e) {
    //     // return a Error message describing the reason     
    //     throw Error("Error while Login User")
    // }

//}