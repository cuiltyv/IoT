//Backend del Equipo 5 de TC1004B.508
//
//Hacemos los imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const config = require('./config/db.config.js')
const router = require('./routes/route')
const app = express()


app.use(cors())

//Traemos el parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Traemos morgan para loggear
app.use(morgan('dev'))

//Traemos el router para la conexion de las nodes
app.use(router)

//Creamos el stream para loggear
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

//Traemos el router para poster desde las nodes
app.use(router)

//Ruta para la pagina principal
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

//Ruta para la pagina principal
app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, 'favicon.ico'))
})

//Ruta para la lista de sensores
app.get('/DB_Request/:dynamic', function(req, res) {
  //Requerimos el modulo para sql
  var mysql = require('mysql2');

  // Parseamos los contenidos de la url
  query = req.url.replace('/DB_Request/', '').replaceAll('_', ' ')
  //console.log(query)

  //Conectamos a la base de datos con la info de /config/db.config.js
  var connection = mysql.createConnection({host: config.HOST, user: config.USER, password: config.PASSWORD, database: config.DB});
  connection.connect();

  //Hacemos la query
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('The query result is: ', results);
    res.status(200).json({info: results});
  });

  //Terminamos la conexion
  connection.end();
})



const port = 3100
app.listen(port, () => {
  console.log('Server started running on : ' + port)
})

