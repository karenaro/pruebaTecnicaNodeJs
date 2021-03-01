
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = new Schema({
  nomUsu:{type: String,unique: true,required: true} ,
  fecha: {type: String,unique: true,required: true} ,
  precio: {type: Number, required: true},
  cliente:{type: String,unique: true,required: true} ,

});

VentaSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Venta', VentaSchema);
