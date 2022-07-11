const express = require('express')
const router = express.Router()
var recetaController = require('../../controllers/recetaController');
var uploadController = require('../../controllers/uploadController');



router.get('/', recetaController.obtenerRecetas)
router.post('/crear-receta/', recetaController.crearReceta)
router.post('/editar-receta/', recetaController.editarReceta)
router.delete('/eliminar-receta/', recetaController.eliminarReceta)
router.post('/buscar/', recetaController.buscarReceta)
//router.post('/filtro/', recetaController.RecetaByFiltro)
router.post('/calificar-receta/', recetaController.calificarReceta)
router.post('/uploadImg/', uploadController.uploadImg);
//router.get('/find/', recetaController.buscarRecetaFiltro2)
//router.post('/filtro3/', recetaController.buscarRecetaFiltro3)

module.exports = router