

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductoSchema = new Schema({
  nombre:{type: String,unique: true,required: true},
  cant:{type: Number, required: true},
  precio:{type: Number, required: true},
  idSede:{type: Number, required: true},


});

ProductoSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Producto', ProductoSchema);
