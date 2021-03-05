//-- import
const express = require("express");
const fsPromises = require("fs/promises");
const validator = require("validator");
const app = require(`${process.cwd()}/app`);
const dataBaseController = require(`${process.cwd()}/classes/dataBaseController`);

//--constants
const DATABASE_DIR = `${process.cwd()}/database/url-data.json`;
const DATA_TEMPLATE_DIR = `${process.cwd()}/classes/urlDataTemplate`;
//-- router
const router = express.Router();

//--router.use
router.use(
  express.urlencoded({
    extended: true,
  })
);

//--router.method
router.post("/new", validateUrl, addUrl, uploadData);
function validateUrl(req, res, next) {
  if (validator.isURL(req.body.url)) {
    req.urlSent = req.body.url;
    next();
  } else {
    const error = new Error("The URL sent is not valid.");
    error.status = 400;
    next(error);
  }
}
async function addUrl(req, res, next) {
  let dataBase = new dataBaseController(
    DATABASE_DIR,
    DATA_TEMPLATE_DIR,
    "longUrl"
  );

  try {
    await dataBase.loadData();
    req.dataBase = dataBase;
    let urlObj = dataBase.addElement(req.urlSent);
    if (urlObj.complete) {
      req.newUrl = urlObj.newDataObj.shortUrl;
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

async function uploadData(req, res, next) {
  try {
    await req.dataBase.uploadData();
    req.dataBase.shutDown();
    res.status(200);
    res.redirect(`../../${res.statusCode}/${req.newUrl}`);
  } catch (error) {
    next(error);
  }
}

//--exports
module.exports = router;
