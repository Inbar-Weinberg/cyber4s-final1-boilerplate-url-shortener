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
  try {
    req.params.expected = "id";
    req.searchCategory = "shortUrl";
    reportFound(req, res, next);
    req.searchedUrlObject.clickCount++;
    await uploadDataToJson(req, res, next);
    res.redirect(302, req.searchedUrlObject.longUrl);
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    validateUrl(req, res, next);
    req.newUrlObject = req.dataBase.addElement(req.body.url);
    addUrl(req, res, next);
    await uploadDataToJson(req, res, next);
    res.message = req.newUrlObject.shortUrl;
    res.status(200);
    res.redirect(`/../?status=${res.statusCode}&message=${res.message}`);
  } catch (err) {
    next(err);
  }
});

// I know its better to do this with a fetch / axios request
router.get("/delete/:id", async (req, res, next) => {
  try {
    req.params.expected = "id";
    req.searchCategory = "shortUrl";
    reportFound(req, res, next);
    req.dataBase.removeElement(
      req.params[req.params.expected],
      req.searchCategory
    );
    await uploadDataToJson(req, res, next);
    res.status(200);
    res.message = undefined;
    res.redirect(`/../?status=${res.statusCode}`);
  } catch (error) {
    next(error);
  }
});

//--exports
module.exports = router;

//-- accessory functions:
function addUrl(req, res, next) {
  if (req.newUrlObject === undefined) {
    const error = new Error(
      "The URL sent all ready has a shortened url, look in the list below."
    );
    error.status = 409;
    throw error;
  }
}
