require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");

//----
app.set("view engine", "ejs");

//---
app.use(cors()); // allow access to write files
//app.use("/public", express.static(`./public`)); //


app.get("/", (req, res) => {
  res.render("index.ejs"//, (err,html)=>{    res.send(Error); double check this works  }
  );
});


module.exports = app;


