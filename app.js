require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;


//register view engine:
app.set('view engine','ejs') // looks for 'views' folder by default
app.set('views','folder name') // Looks for view in other folder.

// in app.js use res.render ("index"(no '.js' ))

