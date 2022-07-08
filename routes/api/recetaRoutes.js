const express = require('express')
const router = express.Router()
var recetaController = require('../../controllers/recetaController');
const { protect } = require('../../middleware/authMiddleware')


router.get('/', recetaController.obtenerRecetas)
router.post('/crear-receta/', recetaController.crearReceta)
router.post('/editar-receta/', recetaController.editarReceta)
router.delete('/eliminar-receta/', recetaController.eliminarReceta)
router.post('/buscar/', recetaController.buscarReceta)
router.get('/:id', recetaController.obtenerRecetaID)
//router.post('/filtro/', recetaController.RecetaByFiltro)
router.post('/calificar-receta/', recetaController.calificarReceta)
//router.get('/find/', recetaController.buscarRecetaFiltro2)
//router.post('/filtro3/', recetaController.buscarRecetaFiltro3)

module.exports = router