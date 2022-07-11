const departamentoRouter = require("./departamento_router");
const loginRouter = require("./login_router");
const ordenRouter = require("./orden_router");

module.exports = (app) => {
  app.use("/api/v1", departamentoRouter);
  app.use("/api/v1", loginRouter);
  app.use("/api/v1", ordenRouter);
};
