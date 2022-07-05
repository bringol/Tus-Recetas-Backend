const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { protect } = require('../../middleware/authMiddleware')

//test
const userService = require('../../services/userService');

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/me', protect, userController.getUserByToken)
router.post('/email', protect, userController.getUserByEmail)
router.put('/editar/perfil',protect, userController.editarUser)//datos personales
router.put('/editar/password',protect, userController.editarPassword)


//mail
//router.post('/reset', userService.RecuperacionTEST)
router.post('/olvido', userService.olvidoPassword)
router.post('/reset', userService.reinicioPassword)


//router.post('/recupero3', userService.olvidoPassword)



//testing
//router.post('/buscar', userService.buscarUser)
//router.put('/update/:userid', protect, userController.updatePassword)
//router.put('/update/:id', protect, userService.updateUser3)
//router.post('/editar-user/', userController.editarUser)
//router.route("/").put(protect,userController.updateUser)

module.exports = router
