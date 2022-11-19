const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/route')
const sqlscr = require('./sql_trial')
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(router)

//app.use(express.static(path.join(__dirname,'sql_trial.js')));
//app.use(express.static('IoT'))
app.use(express.static(__dirname))
console.log(__dirname)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
  //res.sendFile(path.join(__dirname, 'sql_trial.js'))
})

app.get('/getData', function(req, res) {
  res.status(200).json({info: 'preset text'})
})

app.get('/getData2', function(req, res) {

var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'danfo',
  password : 'D4062.tectec',
  database : 'iot'
});

connection.connect();

connection.query('SELECT * FROM log_temp', function (error, results, fields) {
  if (error) throw error;
  console.log('The query result is: ', results);
  res.status(200).json({info: results[0].log_id});
  //document.getElementById("lista").innerHTML = results;
});


connection.end();
})

const port = 3100

// app.listen(process.env.PORT || port , (err) => {
app.listen(port, () => {
  console.log('Server started running on : ' + port)
})

