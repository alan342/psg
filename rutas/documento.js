const { Router } = require("express");
const express = require("express");
const ruta = express.Router();
const {seguridad} = require('../middleware/seguridad');

const { 
    getDocumentoById, 
    getDocumentos, 
    crearDocumento, 
    updateDocumento, 
    deleteDocumento, 
    pagination
} = require("../controllers/documento");
ruta
.route('/')
.get( seguridad, getDocumentos)
.post( seguridad, crearDocumento)

ruta
.route('/:id')
.get( seguridad, getDocumentoById)
.put( seguridad, updateDocumento)
.delete( seguridad, deleteDocumento)

ruta
.route('/pagination')
.post( seguridad, pagination);
module.exports = ruta;