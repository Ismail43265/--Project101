const express = require("express");
const settlementController = require("../controllers/settlement.controller");
const userAuthentication = require("../middlewares/auth.middleware");

const router = express();

router.post("/pay" , userAuthentication.authUser ,settlementController.pay);

module.exports = router;