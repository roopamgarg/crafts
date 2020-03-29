const express = require("express");
const router = express.Router();
const deliveryInfoHandler = require("../controllers/delivery");

router.post("/add",deliveryInfoHandler.create);

module.exports = router;
