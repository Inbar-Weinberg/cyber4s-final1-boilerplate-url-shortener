require("dotenv").config();
const cors = require("cors");
const fsPromises = require("fs/promises");

const express = require("express");
const app = express();
const api = require("./api");

const dataBaseController = require(`${process.cwd()}/classes/dataBaseController`);

//--constants
const DATABASE_DIR = `${process.cwd()}/database/url-data.json`;
const DATA_TEMPLATE_DIR = `${process.cwd()}/classes/urlDataTemplate`;

//----
app.set("view engine", "ejs");

//---
app.use(cors()); // allow access to write files
app.use("/public", express.static(`./public`));

//--
app.get("/(:id)?(/:url)?", async (req, res) => {
  const status = req.params.id;
  if (!isNaN(status) || !status) {
    const url = req.params.url;
    try {
      let dataBase = new dataBaseController();
      await dataBase.loadData();
      const allUrls = dataBase.getAllElements() || [];
      res.render("index", { allUrls, status, url });
    } catch (error) {
      res.render("index", { allUrls: [], status: 500, url: error });
    }
  }
});

app.use("/api", api);

module.exports = app;
