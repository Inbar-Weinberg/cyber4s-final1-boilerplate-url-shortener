require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");

//----
app.set("view engine", "ejs");

//---
app.use(cors()); // allow access to write files
app.use("/public", express.static(`./public`)); 

//--
app.get("/", (req, res) => {
  res.render("index.ejs");
  // edit error options
  //, (err,html)=>{    res.send(Error); double check this works  }
});
app.use('/api',api);



module.exports = app;


