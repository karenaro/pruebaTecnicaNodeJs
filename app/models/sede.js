

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SedeSchema = new Schema({
  nomSede:{type: String,unique: true,required: true},
  telSede:{type: Number, required: true},
  dirSede:{type: String, required: true},



});

SedeSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Sede', SedeSchema);
