//Module core
const http = require("http");

//Module npm
const mongoose = require("mongoose");

if(process.env.NODE_ENV==='dev'){
    require("dotenv").config({path: `${__dirname}/.env.dev`});
  
  }else if(process.env.NODE_ENV==='prod'){
    require("dotenv").config({path: `${__dirname}/.env.prod`});
  }

//self modules
const app = require("./config/app")
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongo Ok");

  server.listen(process.env.PORT, () => {
    console.log("Server Up port 3000");
  });
});

