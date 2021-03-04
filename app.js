require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");
const fsPromises = require("fs/promises");
const URL_DATABASE_dir = `${process.cwd()}/database/url-data.json`;

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
      const allUrls = JSON.parse(await fsPromises.readFile(URL_DATABASE_dir))
        .urls;
      res.render("index", { allUrls, status, url });
    } catch (error) {
      console.log(error);
    }
  }
  // res.redirect(`/${req.params.id}`)
});

app.use("/api", api);


module.exports = app;
