require("dotenv").config();
const cors = require("cors");
const fsPromises = require("fs/promises");

const express = require("express");
const app = express();
const api = require("./api");

app.set("view engine", "ejs");
console.log(Object.keys(app.settings.view));
//-- use after Listen.start
app.use("/", () => {
  const { dataBase } = require(`${process.cwd()}/classes/dataBaseController`);
});
app.use(cors()); // allow access to write files
app.use("/public", express.static(`./public`));
//app.get('./', (req, res)=>console.log (dataBase));
/*

//---


//--
app.get("/(:id)?(/:url)?", async (req, res) => {
  const status = req.params.id;
  if (!isNaN(status) || !status) {
    const url = req.params.url;
    try {
      let dataBase = new dataBaseController(
        DATABASE_DIR,
        DATA_TEMPLATE_DIR,
        "longUrl"
      );

      await dataBase.loadData();
      const allUrls = dataBase.getAllElements() || [];
      res.render("index", { allUrls, status, url });
    } catch (error) {
      res.render("index", { allUrls: [], status: 500, url: error });
    }
  }
});

app.use("/api", api);*/

module.exports = app;
