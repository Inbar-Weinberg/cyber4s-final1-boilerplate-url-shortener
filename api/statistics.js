//-- import
const express = require("express");
const app = require(`${process.cwd()}/app`);
const { reportFound } = require("../utils");

//-- router
const router = express.Router();

//--router.use
router.use(
  express.urlencoded({
    extended: true,
  })
);

//--
router.get("/:shortId", (req, res, next) => {
  req.searchCategory = "shortUrl";
  req.params.expected = "shortId";
  reportFound(req, res, next);
  res.json(req.searchedUrlObject);
});

//-- exports
module.exports = router;

