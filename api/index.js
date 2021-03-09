const { Router } = require("express");
const shorturl = require("./shorturl");
const statistics = require("./statistics");

const api = Router();

api.use("/shorturl", shorturl);
api.use("/statistics", statistics);
//error handler
api.use("/*", (error, req, res, next) => {
  res.status(error.status || 500);
  res.message = error;
  res.redirect(`/../?status=${res.statusCode}&message=${res.message}`);
});

module.exports = api;
