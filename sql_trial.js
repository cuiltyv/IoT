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
  //document.getElementById("lista").innerHTML = results;
});


connection.end();
