//En este archivo vamos a contectarnos a la BBDD e iniciar el servidor

import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config() //se carga la variable de entorno
const MongoClient=mongodb.MongoClient//acceso al cliente mongo

const port=process.env.PORT || 8000

//ahora nos conectamos a cliente mongo
MongoClient.connect(
    //una vez conectados se debe pasar el URI de la BBDD
    process.env.RESTRECETAS_DB_URI,
    {   //opciones para acceder a la BBDD
        maxPoolSize:50, //solo 50 personas pueden acceder
        wtimeoutMS:2500, //desp de 2500ms hay timeout
        useNewUrlParser:true //
    })
    .catch(err=>{
        console.error(err.stack)
        process.exit(1)

    })//ahora que se conectó y chequeó errores
    .then(async client =>{
        //app.listen es para dar comienzo el servidor despues de lograr la conex con la bbdd
        app.listen(port,()=>{
            console.log(`Escuchando en puerto ${port}`)
        })
    })
//Ahora logramos conectarnos a la BBDD e iniciamos el servidor web



