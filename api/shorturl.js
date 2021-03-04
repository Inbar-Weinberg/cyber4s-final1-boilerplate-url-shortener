//-- packages used
const express = require("express");
const fsPromises = require("fs/promises");
const dataTemplate = require(`${process.cwd()}/templates/urlDataTemplate`);
const validator = require("validator");

const router = express.Router();
const URL_DATABASE_dir = `${process.cwd()}/database/url-data.json`;
//--
router.use(
  express.urlencoded({
    extended: true,
  })
);

//--get,post
router.get("/", async (req, res) => {});

router.post("/new", async (req, res) => {
  const newUrlData = new dataTemplate(req.body.url);
  if (validator.isURL(req.body.url)) {
    try {
      const allUrls = JSON.parse(await fsPromises.readFile(URL_DATABASE_dir));
      allUrls.urls.push(newUrlData);
      await fsPromises.writeFile(
        URL_DATABASE_dir,
        JSON.stringify(allUrls, null, 4)
      );
      res.status(200);
      res.redirect(`../../${res.statusCode}/${newUrlData.shortUrl}`);
    } catch (err) {
      res.status(500);
      res.redirect(`../../${res.statusCode}/${err}`);
    }
  } else {
    res.status(400);
    const message = "The URL sent is not valid.";
    res.redirect(`../../${res.statusCode}/${message}`);
  }
});

//--exports
module.exports = router;
