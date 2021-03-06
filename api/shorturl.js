//-- import
const express = require("express");
const fsPromises = require("fs/promises");
const validator = require("validator");
const app = require(`${process.cwd()}/app`);

//-- router
const router = express.Router();

//--router.use
router.use(
  express.urlencoded({
    extended: true,
  })
);

//--router.method
router.get("*/:id", (req, res) => {
  const longUrl = req.dataBase.getElement(req.params.id, "shortUrl").longUrl;
  if (!longUrl) {
    res.status(404);
    res.redirect(`../../${res.statusCode}`);
  }
  res.status(302).redirect(longUrl);
});

router.post("/new", validateUrl, addUrl, uploadDataToJson, (req, res) => {
  res.redirect(`../../${res.statusCode}/${req.shortUrl}`);
});
function addUrl(req, res, next) {
  let response = req.dataBase.addElement(req.body.url);
  if (response.success) {
    req.shortUrl = response.newDataObj.shortUrl;
    next();
  } else {
    const error = new Error(
      "The URL sent all ready has a shortened url, look in the list below."
    );
    error.status = 409;
    next(error);
  }
}

//--exports
module.exports = router;

//-- accessory functions:
function validateUrl(req, res, next) {
  if (validator.isURL(req.body.url, { require_protocol: true })) next();
  else if (validator.isURL(req.body.url, { require_protocol: false })) {
    req.body.url = "https://" + req.body.url;
    next();
  } else {
    const error = new Error("The URL sent is not valid.");
    error.status = 400;
    next(error);
  }
}

async function uploadDataToJson(req, res, next) {
  try {
    await req.dataBase.uploadData();
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
}
