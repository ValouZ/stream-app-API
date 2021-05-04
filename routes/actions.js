var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var actionsController = require("../controllers/actionsController");
var auth = require("../middleware/auth");


module.exports = router;