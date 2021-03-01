const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Usuario.find((err, usuarios) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Ventana Usuarios ',
      usuarios: usuarios
    });
  });
});

router.get('/usuarios', (req, res, next)=>{
  Usuario.find((err, usuarios) => {
   if (err) return res.status(500).send({message:
   'error al realizar la peticion :  '+ err})
   if(!usuarios) return res.status(404).send({ message: 'No existen usuarios' })
   res.status(200).send({ usuarios })
   });
  });

router.get('/usuarios/:usuarioId', (req, res, next) => {
   let usuarioId = req.params.usuarioId
  Usuario.findById(usuarioId, (err, usuario) => {
    if (err) return res.status(500).send({message:
        'Error al realizar la peticion : ' + err})
    if (!usuario) return res.status(404).send({message: 'No existen'})

    res.status(200).send({ usuario })
   });
  });

router.post('/usuario', (req, res, next) => {
  let usuario = new Usuario()
    usuario.Usuario = req.body.Usuario
    usuario.correo = req.body.correo
    usuario.password = req.body.password

  usuario.save((err, usuarioStored) => {
    if (err) res.status(500).send({message:
        'Error al salvar en la base de datos: ' + err})

      res.status(200).send({usuario: usuarioStored})
  })
});

router.put('/usuarios/:usuarioId',(req, res, next) => {
  let usuarioId= req.params.usuarioId

  let usuarioUpdate= req.body

  Usuario.findByIdAndUpdate(usuarioId, usuarioUpdate,(err, usuarioStored) => {
    if (err) res.status(500).send({message:
       'Error al salvar en la base de datos : ' + err})

    res.status(200).send({ usuario: usuarioStored})
  });
});

router.delete('/usuario/:usuarioId', (req, res, next)=>{
  let usuarioId = req.params.usuarioId
  Usuario.findByIdAndRemove(usuarioId, (err, usuario) => {
  if (err) return res.status(500).send({message:
       'Error al realizar la peticion : ' + err})
  if(!usuario) return res.status(404).send({message: 'No existen '})

  res.status(200).send({ usuario })
  });
});

router.post('/signin',(req, res, next) => {
  Usuario.findOne({correo : req.body.correo}, (err, user) => {
    if (err) return res.status(500).send({ message:
      `Error al ingresar: ${err}` })
    if (!user) return res.status(404).send({ message:
      `No existe el usuario: ${req.body.correo}` })

    return user.comparePassword(req.body.password,
       (err, isMatch) => {
      if (err) return res.status(500).send(
        { message: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send(
        { message: `Error de contraseña: ${req.body.correo}` })

      req.user = user
      return res.status(200).send({ message:
        'Te has logueado correctamente'
        })
    });
  }).select('_id correo password');

  });
