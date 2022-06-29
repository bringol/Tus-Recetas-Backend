
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


//crear HTTP errores para Express
var createError = require('http-errors');
//Express
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bluebird = require('bluebird');
var fs = require('fs');

//incorporo cors
var cors = require('cors');


// //importo router
// app.use('/api/users', require('./routes/userRoutes'))
// app.use('/api/recetas', require('./routes/recetaRoutes'))

//importo router
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//aplico cors
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Indico las rutas de los endpoint
app.use('/api', apiRouter);
app.use('/', indexRouter);


//Database connection --
connectDB()


// Setup server
const port = process.env.PORT || 8000
app.use(errorHandler)
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))

// // Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   )
// } else {
//   app.get('/', (req, res) => res.send('Cambiar a modo Producción'))
// }

// app.use(errorHandler)

// app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))


