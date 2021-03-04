//-- import
const express = require("express");
const fsPromises = require("fs/promises");
const dataTemplate = require(`${process.cwd()}/templates/urlDataTemplate`);
const validator = require("validator");
const app = require("../app");

//--constants
const URL_DATABASE_DIR = `${process.cwd()}/database/url-data.json`;

//-- router
const router = express.Router();

//--router.use
router.use(
  express.urlencoded({
    extended: true,
  })
);

//--router.method
router.post("/new", urlValidator, allReadyCreated, addNewUrl);
function urlValidator(req, res, next) {
  if (validator.isURL(req.body.url)) {
    req.urlSent = req.body.url;
    next();
  } else {
    const error = new Error("The URL sent is not valid.");
    error.status = 400;
    next(error);
  }
}
async function allReadyCreated(req, res, next) {
  try {
    let allUrls = JSON.parse(await fsPromises.readFile(URL_DATABASE_DIR));
    if (!allUrls.urls.find((element) => element.longUrl === req.urlSent)) {
      req.allUrls = allUrls;
      next();
    } else {
      const error = new Error(
        "The URL sent all ready has a shortened url, look in the list below."
      );
      error.status = 409;
      next(error);
    }
  } catch (error) {
    next(error);
  }
}
async function addNewUrl(req, res, next) {
  const newUrlData = new dataTemplate(req.body.url);
  const message = newUrlData.shortUrl;
  try {

    req.allUrls.urls.push(newUrlData);


    
    await fsPromises.writeFile(
      URL_DATABASE_DIR,
      JSON.stringify(req.allUrls, null, 4)
    );
    res.status(200);
    //console.log.(`${process.cwd()}/${res.statusCode}/${message}`)

    res.redirect(`../../${res.statusCode}/${message}`);
  } catch (error) {
    error.status = 505;
    next(error);
  }
}

//--exports
module.exports = router;
