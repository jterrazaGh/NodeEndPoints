const express = require("express");
const morgan = require("morgan");
let cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swagger.config.json");
const swaggerJsdoc = require("swagger-jsdoc");
const routerV1 = require("../routers/v1/index.js");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Swagger
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use(
"/api/docs",
swaggerUI.serve,swaggerUI.setup(swaggerDocs, { explorer: true }));

//Router
routerV1(app);

module.exports = app;