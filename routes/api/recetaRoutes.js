const express = require('express')
const router = express.Router()
var recetaController = require('../../controllers/recetaController');
var uploadController =  require('../../controllers/uploadController');
const { protect } = require('../../middleware/authMiddleware')


router.get('/', recetaController.obtenerRecetas)
router.post('/crear-receta/',protect, recetaController.crearReceta)
router.post('/editar-receta/',protect, recetaController.editarReceta)
router.delete('/eliminar-receta/',protect, recetaController.eliminarReceta)
router.get('/:id', recetaController.obtenerRecetaID)
router.post('/buscar/', recetaController.buscarReceta)
router.get('/auth/:id',protect, recetaController.obtenerRecetaID)
router.post('/user/misrecetas/',protect, recetaController.obtenerRecetaMail)
router.post('/calificar-receta/',protect, recetaController.calificarReceta)
router.post('/uploadImg/', uploadController.uploadImg)
router.get('/recetas/', recetaController.obtenerRecetasFiltros)


module.exports = router