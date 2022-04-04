const mysql = require("mysql2");
const { promisify } = require('util');

var sqlConnecion = mysql.createConnection({
    host:"free-version.cqycr40fklnk.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"12345678",
    database:"contactos" 
});

sqlConnecion.connect(function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Se conecto con exito");
    }

});

sqlConnecion.query = promisify(sqlConnecion.query)

module.exports = sqlConnecion;
