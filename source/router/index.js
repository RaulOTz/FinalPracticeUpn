const express = require("express");
const dbContactos = require('../models/contactos.js');
const router = express.Router();
const mysql = require("mysql2");



router.post('/contactosList', async (req,res) => {
	let contactos = await dbContactos.Contactos.mostrarTodos();
		if (!contactos.length) return res.render('contactosList.html', { titulo : 'Lista de Contactos', contactos: [], contacto: null });

			res.render('contactosList.html', { titulo : 'Lista de Contactos', contactos: contactos, contacto: null })
});

router.post('/contactosList/nuevo', async (req,res) => {
	const { nombre, domicilio, telefono } = req.body;
		await dbContactos.Contactos.insertar({nombre, domicilio, telefono});

			res.redirect('/contactosList')
});

router.get('/contactosList/id', async (req,res) => {
	const { idContactos } = req.query;
		if (!idContactos) return res.redirect('/contactosList');
			const contacto = await dbContactos.Contactos.buscarId(idContactos);

				res.render('contactosList.html', { titulo: 'Lista de Contactos', contactos: [], contacto: contacto[0]});
});

router.post('/contactosList/id', async (req,res) => {
	const { idContactos, nombre, domicilio, telefono } = req.body;
		if (!idContactos) return res.redirect('/contactosList');
			await dbContactos.Contactos.actualizar({nombre, domicilio, telefono, idContactos});

				res.redirect('/contactosList');
})

router.post('/contactosList/id/borrar', async (req,res) => {
	const { idContactos } = req.body;
		if (!idContactos) return res.redirect('/contactosList');
			await dbContactos.Contactos.borrar(idContactos);

				res.redirect('/contactosList');
})







router.get('/',(req,res)=>{
    res.send("Iniciamos Servidor");
});

router.get('/index',(req,res)=>{
	res.render('index.html',{titulo:'Index'})
});
router.get('/acercade',(req,res)=>{
	res.render('acercade.html',{titulo:'Acerca de'})
});

router.get('/contactosList',(req,res) => {
	res.render('contactosList.html', { titulo : 'Lista de Contactos', contactos: [], contacto: null })
});


router.get('*',(req,res)=>{
	res.send("No existe la pagina");
})
module.exports=router;
