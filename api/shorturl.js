//-- import
const express = require("express");
const app = require(`${process.cwd()}/app`);
const { validateUrl } = require("../utils");
const { uploadDataToJson } = require("../utils");
const { reportFound } = require("../utils");

//-- router
const router = express.Router();

//--router.use
router.use(
  express.urlencoded({
    extended: true,
  })
);

//--router.method
router.get("/:id", async (req, res, next) => {
  req.params.expected = "id";
  req.searchCategory = "shortUrl";
  reportFound(req, res, next);
  req.searchedUrlObject.clickCount++;
  await uploadDataToJson(req, res, next);
  res.status(302).redirect(req.searchedUrlObject.longUrl);
});

router.post("/new", async (req, res, next) => {
  console.log(req.query);
  validateUrl(req, res, next);
  req.newUrlObject = req.dataBase.addElement(req.body.url);
  addUrl(req, res, next);
  await uploadDataToJson(req, res, next);
  res.status(200);
});

// I know its better to do this with a fetch / axios request
router.get("/delete/:id", async (req, res, next) => {
  req.params.expected = "id";
  req.searchCategory = "shortUrl";
  reportFound(req, res, next);
  req.dataBase.removeElement(
    req.params[req.params.expected],
    req.searchCategory
  );
  await uploadDataToJson(req, res, next);
  res.status(200);
  message = "deleted";
  const allUrls = req.dataBase.getAllElements();
  res.render(`index`, {allUrls, status: res.statusCode, url: message });
});

router.use('/*')
//--exports
module.exports = router;

//-- accessory functions:
function addUrl(req, res, next) {
  if (!req.newUrlObject) {
    const error = new Error(
      "The URL sent all ready has a shortened url, look in the list below."
    );
    error.status = 409;
    next(error);
  }
}
