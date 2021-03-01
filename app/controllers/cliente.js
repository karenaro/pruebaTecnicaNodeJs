const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Cliente.find((err, cliente) => {
    if (err) return next(err);
    res.render('index', {
      title: 'C L I E N T E S ',
      cliente: cliente
    });
  });
});

router.get('/clientes', (req, res, next)=>{
    Cliente.find((err, clientes) => {
     if (err) return res.status(500).send({message:
     'error al realizar la peticion :  '+ err})
     if(!clientes) return res.status(404).send({ message: 'No existen ' })
     res.status(200).send({ clientes})
     });
    });

router.get('/clientes/:clienteId', (req, res, next) => {
   let clienteId = req.params.clienteId
   Cliente.findById(clienteId, (err, cliente) => {
     if (err) return res.status(500).send({message:
          'Error al realizar la peticion : ' + err})
      if (!cliente) return res.status(404).send({message: 'No existen '})

    res.status(200).send({ cliente })
   });
});

router.post('/cliente', (req, res, next) => {
    let cliente = new Cliente()
      cliente.nombre = req.body.nombre
      cliente.ident = req.body.ident
      cliente.telefono = req.body.telefono
      cliente.direccion = req.body.direccion

    cliente.save((err, clienteStored) => {
      if (err) res.status(500).send({message:
          'Error al salvar en la base de datos: ' + err})

        res.status(200).send({cliente:clienteStored})
    })
  });

  router.put('/clientes/:clienteId',(req, res, next) => {
    let clienteId = req.params.clienteId

    let clienteUpdate= req.body

    Cliente.findByIdAndUpdate(clienteId, clienteUpdate,(err, clienteStored) => {
      if (err) res.status(500).send({message:
         'Error al salvar en la base de datos : ' + err})

      res.status(200).send({cliente: clienteStored})
    });
  });

  router.delete('/cliente/:clienteId', (req, res, next)=>{
    let clienteId = req.params.clienteId
    Cliente.findByIdAndRemove(clienteId, (err, cliente) => {
    if (err) return res.status(500).send({message:
         'Error al realizar la peticion : ' + err})
    if(!cliente) return res.status(404).send({message: 'No existen '})

    res.status(200).send({ cliente })
    });
  });
