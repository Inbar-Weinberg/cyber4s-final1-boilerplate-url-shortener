const express = require("express");
const fsPromises = require("fs/promises");
const dataTemplate = require("../templates/urlDataTemplate");
const router = express.Router();

const URL_DATABASE_dir = `${process.cwd()}/database/url-data.json`;

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.get("/", async (req, res) => {
  try {
    const allUrls = JSON.parse(await fsPromises.readFile(URL_DATABASE_dir))
      .urls;
    //  res.send(allUrls);
    //res.render('index',{allUrls: allUrls});
  } catch (error) {
    console.log(error);
  }
});
//
//
//
router.post("/new", async (req, res) => {
    res.send(typeof dataTemplate);
 // const newUrlData = new dataTemplate(req.body.url);
  try {
    res.send(req.body.url);

    const allUrls = JSON.parse(await fsPromises.readFile(URL_DATABASE_dir));
    allUrls.urls.push(newUrlData);
    await fsPromises.appendFile(URL_DATABASE_dir, urlArray);
    res.status(200);
    res.send(req.body.url);
    res.redirect("/");
    //add error notes
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
