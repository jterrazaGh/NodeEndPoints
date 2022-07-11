const ModelDepartamento = require('../models/departamento_model');
const { util_handler } = require("../middlewares/middleware_error");

//==========
//	Guardar Departamento
//==========
function guardar(req, res, next){

    
    let data = {
        departamento_nombre : req.body.departamento_nombre
    }

    let documento = ModelDepartamento(data);

    documento.save( (err, doc) => {
        
        if(err)  return util_handler(doc, next, err)

        return res.json({
            data : doc
        })
    
    });

}

//==========
//	Listar Categoria
//==========

function listar(req, res) {

    ModelDepartamento.find( (err, docs) => {
        return res.json( docs );
    } );
}

//==========
//	Update departamento
//==========

function actualizar(req , res ) {

    const id = req.params.id;

    let data = {
        departamento_nombre: req.body.departamento_nombre,
        status : req.body.status

    }

    ModelDepartamento.findByIdAndUpdate(id, data , {new: true}, (err, doc ) => {
        
        if(err) return util_handler(doc, next, err)

        return res.json(doc);
    })
    

}


module.exports = {
    guardar,
    listar,
    actualizar
}