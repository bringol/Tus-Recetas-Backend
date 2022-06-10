const express = require('express')
const router = express.Router()
// const {
//   registerUser,
//   loginUser,
//   getMe,
//   updateUser,
// } = require('../controllers/userController')

const userController= require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')




router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/mail', protect, userController.getUsersByMail)
router.get('/me', protect, userController.getMe)
router.route("/:id").put(userController.updateUser)

module.exports = router
