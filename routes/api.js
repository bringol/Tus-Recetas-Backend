/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/userRoutes')
var recetas = require('./api/recetaRoutes')


router.use('/users', users);
router.use('/recetas', recetas);

module.exports = router;
