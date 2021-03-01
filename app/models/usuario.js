

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsuarioSchema = new Schema({
  usuario:{type: String,unique: true,required: true},
  correo:{ type: String, unique: true, lowercase: true },
  password:{ type: String, select: false },

});

UsuarioSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Usuario', UsuarioSchema);
