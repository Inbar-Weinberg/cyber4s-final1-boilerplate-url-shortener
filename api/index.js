const { Router } = require("express");
const shorturl = require("./shorturl");
const statistics = require("./statistics");

const router = Router();


api.use("/shorturl", shorturl);
api.use("/statistics", statistics)


module.exports=api;