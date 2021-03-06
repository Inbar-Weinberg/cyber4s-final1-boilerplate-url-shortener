//-- import
const express = require("express");
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
router.get("/:id", (req, res) => {
  const urlObject = req.dataBase.getElement(req.params.id, "shortUrl");
  if (!urlObject) {
    res.status(404);
    message("No URL with this I.D was found.");
    res.redirect(`../../${res.statusCode}`);
  }
  urlObject.clickCount++;
  req.dataBase.uploadData();
  res.status(302).redirect(urlObject.longUrl);
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

// I know its better to do this with a fetch / axios request
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const urlObject = req.dataBase.getElement(id, "shortUrl");

  if (!urlObject) {
    res.status(404);
    message("No URL with this I.D was found.");
    res.redirect(`../../${res.statusCode}`);
  }
  req.dataBase.removeElement(id, "shortUrl");
  req.dataBase.uploadData().then(() => {
    res.status(200);
    res.redirect(`back`);
  });
});

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
