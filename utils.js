function dateToSQL(date) {
  let pad = function (num) {
    return ("00" + num).slice(-2);
  };
  let sql =
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    " " +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes());
  return sql;
}
function validateUrl(req, res, next) {
  const validator = require("validator");
  if (!validator.isURL(req.body.url, { require_protocol: true })) {
  } else if (!validator.isURL(req.body.url, { require_protocol: false })) {
    const error = new Error("The URL sent is not valid.");
    error.status = 400;
    next(error);
  } else {
    req.body.url = "https://" + req.body.url;
  }
}

async function uploadDataToJson(req, res, next) {
  await req.dataBase.uploadData().catch((error) => next(error));
}

function reportFound(req, res, next) {
  req.searchedUrlObject = req.dataBase.getElement(
    req.params[req.params.expected],
    req.searchCategory
  );
  if (!req.searchedUrlObject) {
    const error = new Error("No URL with this I.D was found.");
    error.status = 404;
    next(error);
  }
}

module.exports = { dateToSQL, validateUrl, uploadDataToJson, reportFound };
