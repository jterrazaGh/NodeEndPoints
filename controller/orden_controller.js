const ModelUsuario = require('../models/usuario_model');
const ModelOrden = require('../models/orden_model');
const res = require("express/lib/response");

//==========
// [Param] 	getOrden
//==========

function getOrden(req, res, next, id) {
  let query = ModelOrden.findById(id);
  query.exec((err, doc) => {
    if (err) return util_handler(doc, next, err);

    req.docOrden = doc;
    next();
  });
}

//==========
//	Guardar Orden
//==========

async function guardarOrden(req, res, next) {
  try {

    let idUsuario = req.body.usuarioId;
    
    let docUsuario = await ModelUsuario.findById(idUsuario).exec();
    
    console.log("docusuario ",docUsuario);

    let data = {
      oUsuario: {
        nombre: docUsuario.nombre,
        email: docUsuario.email,
        departamento_nombre: docUsuario.departamento_nombre,
        usuarioId: docUsuario._id
      },
      orden_detalle: req.body.orden_detalle,
      valor: req.body.valor,
      estado: req.body.estado,
      fecha_orden: req.body.fecha_orden,
    };
    
    let docOrden = new ModelOrden(data);
    docOrden.save((err, doc) => {
      if (err) return util_handler(doc, next, err);

      return res.json({
        data: doc
      });
    });
    

  } catch (error) {

    return next(error);

  }

}

//==========
//	Get Orden
//==========

function getxId(req, res, next) {
  return res.json(req.docOrden);
}

//==========
//	Get Orden x Usuario
//==========
function getxUserID(req, res) {

  const id = req.params.usuario;

  ModelOrden.find({"oUsuario.usuarioId":id},(err, docs) => {

    return res.json(docs);
  });
}

//==========
//	Get Orden All
//==========
function getxAll(req, res, next) {

  ModelOrden.find({"oUsuario.usuarioId":id},(err, docs) => {

    return res.json(docs);
  });
}

//==========
//	PUT Estado
//==========
function actualizarEstado(req , res ) {

  const id = req.params.idOrden;

  let data = {
    estado: req.body.estado,
    fecha_aprobado : Date.now()

  }

  ModelOrden.findByIdAndUpdate(id, data , {new: true}, (err, doc ) => {
      
      if(err) return util_handler(doc, next, err)

      return res.json(doc);
  })
  

}

module.exports = { guardarOrden, getOrden, getxUserID, getxAll, actualizarEstado };