const mysql = require('../database/db')

class MainController {

    async logData(req , res){
        console.log(req.params.tabla)
        console.log(req.params.data)
        console.log(req.params.sensorID)
        if(req.params.sensorID != null && req.params.data != null && req.params.tabla != null) {
            let sensorID = req.params.sensorID
            let data = req.params.data;
            if(req.params.tabla == "humedad"){
                var sql = `insert into humedad (fecha, sensorID, datahumedad) values (now(), ${sensorID}, ${data});`
            }
            else if(req.params.tabla == "alarma"){
                var sql = `insert into alarma (fecha, sensorID, estado) values (now(), ${sensorID}, ${data});`
            }
            else if(req.params.tabla == "salida"){
                var sql = `insert into salida (fecha, sensorID, activacion) values (now(), ${sensorID}, ${data});`
            }
<<<<<<< HEAD
            else if(req.params.tabla == "RFID"){
=======
            else if(req.params.tabla == "validacion"){
>>>>>>> feature/html_requests
                var sql = `insert into humedad (fecha, sensorID, datahumedad) values (now(), ${sensorID}, ${data});`
            }
            else if(req.params.tabla == "distancia"){
                var sql = `insert into distancia (fecha, sensorID, distancia) values (now(), ${sensorID}, ${data});`
            }
            else if(req.params.tabla == "password"){
                var sql = `insert into password (fecha, sensorID, validacion) values (now(), ${sensorID}, ${data});`
            }
            
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
          res.send('Por favor llena todos los datos!')
        }
    }
    
    async getLogs(req,res){
        console.log("Get Logs")
<<<<<<< HEAD
        
        console.log(req.params.tabla)
        if(req.params.tabla != null){
            let tabla = req.params.tabla;
            
            var sql = `SELECT * FROM ${tabla}`


=======
        console.log(req.params.sensorID)
        if(req.params.sensorID!=null){
            let sensorID = req.params.sensorID;
            var sql = `SELECT * FROM humedad where sensorID='${sensorID}'`
>>>>>>> feature/html_requests
            mysql.query(sql, (error, data, fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        data
                    })
                }
            })
        }
    }
}

const tempController = new MainController()
<<<<<<< HEAD
module.exports = tempController;
=======
module.exports = tempController;
>>>>>>> feature/html_requests
