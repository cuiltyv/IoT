const express = require('express');
const sensor = require('../controllers/sensor');
const router = express.Router();
const mysql = require('mysql2')

router.get('/api/getLogs/:tabla', sensor.getLogs);
router.post('/api/logData/:tabla/:sensorID/:data', sensor.logData);

module.exports = router;
