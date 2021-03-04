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
app.get("/", async (req, res) => {
  try {
    const allUrls = JSON.parse(await fsPromises.readFile(URL_DATABASE_dir))
      .urls;
      console.log('-----')

      console.log(allUrls)
    res.render("index", { allUrls: allUrls });
  } catch (error) {
    console.log(error);
  }
});


app.use('/api',api);



module.exports = app;



