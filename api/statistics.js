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

//--
router.get("/:shortId", (req, res) => {
    console.log('----')
  const urlObject = req.dataBase.getElement(req.params.shortId, "shortUrl");
  if (!urlObject) {
    res.status(404);
    message('No URL with this I.D was found.')
    res.redirect(`../../${res.statusCode}`);
  } else {
    res.json(urlObject);
  }
});

//-- exports
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
