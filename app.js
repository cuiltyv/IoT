const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/route')
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

const port = 3100

// app.listen(process.env.PORT || port , (err) => {
app.listen(port, () => {
  console.log('Server started running on : ' + port)
})

