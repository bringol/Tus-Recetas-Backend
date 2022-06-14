const express = require('express')
const router = express.Router()
var recetaController = require('../controllers/recetaController');

router.get('/', recetaController.obtenerRecetas)
router.post('/crear-receta/', recetaController.crearReceta)
router.post('/editar-receta/', recetaController.editarReceta)
router.delete('/eliminar-receta/', recetaController.eliminarReceta)
router.post('/buscar/', recetaController.buscarReceta)

module.exports = router