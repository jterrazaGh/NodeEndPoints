const ModelDepartamento = require('./departamento_model');

const mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const validator_departamento = (val) => {
    let rpta = ModelDepartamento.exists(
        { departamento_nombre: val }
    )
    return rpta;
}

var Schema = mongoose.Schema;

var schemaUsuario = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    departamento_nombre: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "USER_ROLE",
    },
    disponible: {
        type: Boolean,
        default: true,
    },
});

schemaUsuario.path('departamento_nombre').validate(
    {
        validator: validator_departamento,
        message: 'Departamento no Existe ! v3'
    }
)

schemaUsuario.methods.isValidPassword = function (password) {
    // this = docUser 
    return bcrypt.compareSync(password, this.password);
}

schemaUsuario.methods.getToken = function () {

    let payload = {
        usuarioId: this._id,
        role: this.role,
    };

    var token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: process.env.CADUCIDAD_TOKEN,
    });

    return token

}


schemaUsuario.pre("save", function (next) {

    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
        next();
    }

    next();

})

const model = mongoose.model("modelUsuario", schemaUsuario);

module.exports = model;
