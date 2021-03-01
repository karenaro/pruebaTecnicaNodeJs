const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Venta = mongoose.model('Venta');


module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Venta.find((err, ventas) => {
    if (err) return next(err);
    res.render('index', {
      title: 'V E N T A',
      ventas: ventas
    });
  });
});

router.get('/ventas', (req, res, next)=>{
  Venta.find((err, ventas) => {
   if (err) return res.status(500).send({message:
   'error al realizar la peticion :  '+ err})
   if(!sedes) return res.status(404).send({ message: 'No existen ' })
   res.status(200).send({ ventas })
   });
  });

  router.get('/ventas/:ventaId', (req, res, next) => {
    let ventaId = req.params.ventaId
   Venta.findById(ventaId, (err, Venta) => {
     if (err) return res.status(500).send({message:'Error al realizar la peticion : ' + err})
     if (!Venta) return res.status(404).send({message: 'No existen articulos'})

     res.status(200).send({ Venta })

    });
   });

 router.post('/venta', (req, res, next) => {
   let venta = new Venta()
     venta.nomUsu = req.body.nomUsu
     venta.fecha = req.body.fecha
     venta.precio = req.body.precio
     venta.cliente = req.body.cliente

   venta.save((err, ventaStored) => {
     if (err) res.status(500).send({message:
         'Error al salvar en la base de datos: ' + err})

       res.status(200).send({venta: ventaStored})
   })
 });

 router.put('/ventas/:ventaId',(req, res, next) => {
    let ventaId = req.params.ventaId

    let ventaUpdate= req.body

    Venta.findByIdAndUpdate(ventaId, ventaUpdate,(err, ventaStored) => {
      if (err) res.status(500).send({message:
         'Error al salvar en la base de datos : ' + err})

      res.status(200).send({ venta: ventaStored})
    });
  });

  router.delete('/venta/:ventaId', (req, res, next)=>{
    let ventaId = req.params.ventaId
    Venta.findByIdAndRemove(ventaId, (err, venta) => {
    if (err) return res.status(500).send({message:
         'Error al realizar la peticion : ' + err})
    if(!venta) return res.status(404).send({message: 'No existen '})

    res.status(200).send({ venta })
    });
  });
