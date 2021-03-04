const express = require("express");
const fsPromises = require("fs/promises");
const dataTemplate = require(`${process.cwd()}/templates/urlDataTemplate`);
const router = express.Router();
const URL_DATABASE_dir = `${process.cwd()}/database/url-data.json`;

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.get("/", async (req, res) => {});
//

router.post("/new", async (req, res) => {
  const newUrlData = new dataTemplate(req.body.url);
  try {
    const allUrls = JSON.parse(await fsPromises.readFile(URL_DATABASE_dir));
    allUrls.urls.push(newUrlData);
    await fsPromises.writeFile(
      URL_DATABASE_dir,
      JSON.stringify(allUrls, null, 4)
    );
    res.status(200);
    res.redirect("back");
    //add error notes
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
