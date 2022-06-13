const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
//router.get('/me', protect, userController.getMe)
router.get('/me', protect, userController.getUserByToken)
router.post('/email', protect, userController.getUserByEmail)
router.route("/").put(protect,userController.updateUser)//ver video clase donde sacan el id

module.exports = router
