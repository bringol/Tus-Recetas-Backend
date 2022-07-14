const express = require('express')
const router = express.Router()
var recetaController = require('../../controllers/recetaController');
var uploadController =  require('../../controllers/uploadController');
const { protect } = require('../../middleware/authMiddleware')


router.get('/', recetaController.obtenerRecetas)
router.post('/crear-receta/', recetaController.crearReceta)
router.post('/editar-receta/', recetaController.editarReceta)
router.delete('/eliminar-receta/', recetaController.eliminarReceta)
router.post('/buscar/', recetaController.buscarReceta)
router.get('/:id', recetaController.obtenerRecetaID)
router.get('/auth/:id',protect, recetaController.obtenerRecetaID)
router.post('/user/misrecetas/',protect, recetaController.obtenerRecetaMail)

router.post('/calificar-receta/', recetaController.calificarReceta)
//router.get('/find/', recetaController.buscarRecetaFiltro2)
//router.post('/filtro3/', recetaController.buscarRecetaFiltro3)

router.post('/uploadImg/', uploadController.uploadImg)

module.exports = router