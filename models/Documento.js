const mongoose = require('mongoose');
const DocumentoSchema = new mongoose.Schema({
     titulo:{
         required: [true, 'Ingrese un titulo de Documento'],
         maxlength: [500, 'El titulo del Documento no puede ser mayor de 500 caracteres'],
         type: String
     },
     descripcion: String,
     fechaPublicacion: Date,
     autor: { id: String, nombreCompleto: String}
});
module.exports = mongoose.model('Documento', DocumentoSchema);