const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { protect } = require('../../middleware/authMiddleware')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/editar/perfil',protect, userController.editarUser)
router.put('/editar/password',protect, userController.editarPassword)
router.post('/olvido', userController.olvidoPassword)
router.post('/reinicio', userController.reinicioPassword)


module.exports = router
