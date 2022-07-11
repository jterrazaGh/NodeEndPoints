const mongoose = require("mongoose");
let Schema = mongoose.Schema;
//Schema
let schemaOrden = mongoose.Schema({

    oUsuario: {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        departamento_nombre: {
            type: String,
        },
        usuarioId: {
            type: String,
            ref: 'User',
        }
    },
    orden_detalle: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: "Ingresada"
    },
    fecha_orden: {
        type: Date,
        required: true,
        default: Date.now
    },
    fecha_aprobado: {
        type: Date,
    }

}, {
    timestamps: true
});


//Modelo
const model = mongoose.model('modelOrden', schemaOrden);

//exportando modelo 
module.exports = model;