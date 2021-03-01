

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ClienteSchema = new Schema({
  nombre:{type: String,unique: true,required: true},
  ident:{type: Number, required: true},
  telefono:{type: Number, required: true},
  direccion:{type: String, required: true},


});

ClienteSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Cliente', ClienteSchema);
