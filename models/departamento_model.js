const mongoose = require("mongoose");

//Schema
var schemaDepartamento = mongoose.Schema({

    departamento_nombre: {
        type: String,
        unique: true,
        required : true
    },
    status: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});


//Modelo
const model = mongoose.model('modelDepartamento', schemaDepartamento);

//exportando modelo 
module.exports = model;