const { Router } = require("express");
const shorturl = require("./shorturl");
const statistics = require("./statistics");

const api = Router();


api.use("/shorturl", shorturl);
api.use("/statistics", statistics)


module.exports=api;