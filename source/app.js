const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const misRutas = require('./router/index');
const bodyParser = require('body-parser');

//Configuraciones
    //Motor de vistas
    app.set('views engine','ejs')
    app.set('views',path.join(__dirname,'views'));
    app.engine('html',require('ejs').renderFile);
    
    //Recursos publicos

	app.use(bodyParser())
    app.use(express.static(path.join(__dirname, 'public')));

//router
app.use(misRutas);

const puerto =3000;
app.listen(puerto,()=>{
    console.log("Trabajando servidor");
});
