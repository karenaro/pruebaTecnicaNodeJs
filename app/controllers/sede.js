const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sede = mongoose.model('Sede');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Sede.find((err, sede) => {
    if (err) return next(err);
    res.render('index', {
      title: 'S E D E S ',
      sede: sede
    });
  });
});

router.get('/sedes', (req, res, next)=>{
  Sede.find((err, sedes) => {
   if (err) return res.status(500).send({message:
   'error al realizar la peticion :  '+ err})
   if(!sedes) return res.status(404).send({ message: 'No existen ' })
   res.status(200).send({ sedes })
   });
  });

router.get('/sedes/:sedeId', (req, res, next) => {
 let sedeId = req.params.sede.findById(sedeId, (err, sede) => {
   if (err) return res.status(500).send({message:
        'Error al realizar la peticion : ' + err})
    if (!sede) return res.status(404).send({message: 'No existen '})

  res.status(200).send({ sede })
 });
});

router.post('/sede', (req, res, next) => {
  let sede = new Sede()
    sede.nomSede= req.body.nomSede
    sede.telSede = req.body.telSede
    sede.dirSede = req.body.dirSede

  sede.save((err,sedeStored) => {
    if (err) res.status(500).send({message:
        'Error al salvar en la base de datos: ' + err})

      res.status(200).send({sede: sedeStored})
  })
});

router.put('/sedes/:sedeId',(req, res, next) => {
  let sedeId = req.params.sedeId

  let sedeUpdate= req.body

  Sede.findByIdAndUpdate(sedeId, sedeUpdate,(err, sedeStored) => {
    if (err) res.status(500).send({message:
       'Error al salvar en la base de datos : ' + err})

    res.status(200).send({ sede: sedeStored})
  });
});

router.delete('/sede/:sedeId', (req, res, next)=>{
  let sedeId = req.params.sedeId
  Sede.findByIdAndRemove(sedeId, (err, sede) => {
  if (err) return res.status(500).send({message:
       'Error al realizar la peticion : ' + err})
  if(!sede) return res.status(404).send({message: 'No existen articulos'})

  res.status(200).send({ sede })
  });
});
