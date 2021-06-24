const Documento = require("../models/Documento");
const ErrorResponse = require("../helper/errorResponse");
const { response } = require("express");
exports.getDocumentos = async (req, res, next) =>{
    try {
        const documentoLista = await Documento.find();
        res.status(200).json(documentoLista);
    } catch(err){
        next(
            new ErrorResponse(" No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.getDocumentoById = async (req, res, next) => {
    try {
        const documentoUnique = await Documento.findById(req.params.id);
        if(!documentoUnique){
            return next(
                new ErrorResponse(" No se pudo encontrar el Documento", 400)
            );
        }
        res.status(200).json(documentoLista);
    } catch(err){
        next(
            new ErrorResponse(" No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.crearDocumento = async (req, res, next) => {
    try {
        const documentoUnique = await Documento.create(req.body);
        res.status(200).json({
            status:200, 
            data: documentoUnique
        });
    } catch(err){
        next(
            new ErrorResponse(" No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.updateDocumento = async (req, res, next) => {
    try {
        const documentoUnique = await Documento.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status:200, 
            data: documentoUnique
        });
    } catch(err){
        next(
            new ErrorResponse(" No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.deleteDocumento = async (req, res, next) => {
    try {
        const documentoUnique = await Documento.findByIdAndDelete(req.params.id);
        if(!documentoUnique){
            return next(
                new ErrorResponse(" El Documento no existe", 400)
            );
        }
        res.status(200).json({
            status:200, 
            data: documentoUnique
        });
    } catch(err){
        next(
            new ErrorResponse(" No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.pagination = async (req, res, next) => {
try{
const sort = req.body.sort;
const sortDirecion = req.body.sortDirecion;
const page = parseInt(req.body.page);
const pageSize =parseInt(req.body.pageSize);

let filterValor = "";
let filterPropiedad = "";
let documentos = [];
let totalRows = 0;
if (req.body.filterValue){
filterValor = req.body.filterValue.valor;
filterPropiedad = req.body.filterValue.propiedad;
documentos = await Documento.find({
    [filterPropiedad]: new RegExp(filterValor, "i"),
})
.sort({[sort]: sortDirecion})
.skip((page - 1) * pageSize)
.limit(pageSize);
totalRows = await Documento.find({
    [filterPropiedad]: new RegExp(filterValor, "i"),
}).count();
}else{
    documentos = await Documento.find()
    .sort({[sort]: sortDirecion})
    .skip( (page - 1) * pageSize )
    .limit(pageSize);
    totalRows = await Documento.find().count();
} 
const pagesQuantity = Math.ceil(totalRows / pageSize);
res.status(200).json({
    status: 200,
    pageSize,
    page,
    sort,
    sortDirecion,
    pagesQuantity,
    totalRows,
    data: documentos,
});
}catch (err){
    next(
        new ErrorResponse(" No se pudo procesar el request" + err.message, 400)
    );   
}
};