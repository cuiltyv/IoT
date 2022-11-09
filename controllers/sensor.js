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
            else if(req.params.tabla == "validacion"){
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
        console.log(req.params.sensorID)
        if(req.params.sensorID!=null){
            let sensorID = req.params.sensorID;
            var sql = `SELECT * FROM humedad where sensorID='${sensorID}'`
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
module.exports = tempController;
