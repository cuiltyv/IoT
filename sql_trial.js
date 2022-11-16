var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'danfo',
  password : 'D4062.tectec',
  database : 'iot'
});

connection.connect();

connection.query('SELECT * FROM DEVICES', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
