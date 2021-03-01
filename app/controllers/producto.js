const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Producto = mongoose.model('Producto');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Producto.find((err, producto) => {
    if (err) return next(err);
    res.render('index', {
      title: 'P R O D U C T O ',
      producto: producto
    });
  });
});

router.get('/productos', (req, res, next)=>{
    Producto.find((err, productos) => {
     if (err) return res.status(500).send({message:
     'error al realizar la peticion :  '+ err})
     if(!productos) return res.status(404).send({ message: 'No existen articulos' })
     res.status(200).send({ productos})
     });
    });

    router.get('/productos/:productoId', (req, res, next) => {
      let productoId = req.params.productoId
      Producto.findById(productoId, (err, producto) => {
        if (err) return res.status(500).send({message:
             'Error al realizar la peticion : ' + err})
         if (!producto) return res.status(404).send({message: 'No existen articulos'})

       res.status(200).send({ producto })
      });
   });

   router.post('/producto', (req, res, next) => {
       let producto = new Producto()
         producto.nombre = req.body.nombre
         producto.cant = req.body.cant
         producto.precio = req.body.precio
         producto.idSede = req.body.idSede

       producto.save((err, productoStored) => {
         if (err) res.status(500).send({message:
             'Error al salvar en la base de datos: ' + err})

           res.status(200).send({producto:productoStored})
       })
     });

     router.put('/productos/:productoId',(req, res, next) => {
       let productoId = req.params.productoId

       let productoUpdate= req.body

       Producto.findByIdAndUpdate(productoId, productoUpdate,(err, productoStored) => {
         if (err) res.status(500).send({message:
            'Error al salvar en la base de datos : ' + err})

         res.status(200).send({producto: productoStored})
       });
      });

      router.delete('/producto/:productoId', (req, res, next)=>{
        let productoId = req.params.productoId
        Producto.findByIdAndRemove(productoId, (err, cliente) => {
        if (err) return res.status(500).send({message:
             'Error al realizar la peticion : ' + err})
        if(!producto) return res.status(404).send({message: 'No existen articulos'})

        res.status(200).send({ producto })
        });
      });
