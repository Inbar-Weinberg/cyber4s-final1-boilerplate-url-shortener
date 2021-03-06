require("dotenv").config();
const cors = require("cors");
const fsPromises = require("fs/promises");

const express = require("express");
const app = express();
const api = require("./api");
let dataBase;

app.set("view engine", "ejs");
app.use(cors());
app.use("/public", express.static(`./public`));
//-- use after Listen.start
app.use("/", (req, res, next) => {
  req.dataBase = require(`${process.cwd()}/classes/dataBaseController`).dataBase;
  next();
});

app.get("/", (req, res) => {
  const allUrls = req.dataBase.getAllElements();
  res.render("index", {allUrls, status:undefined, url:undefined });
});

app.use("/api", api);

module.exports = app;
