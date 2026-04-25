const express = require("express");

const userAuthentication= require("../middlewares/auth.middleware");
const expenceController= require("../controllers/expence.controller");

const router=express();

router.post("/add", userAuthentication.authUser, expenceController.addExpence);

router.get("/group/:groupId", userAuthentication.authUser, expenceController.getGroupExpence);

router.get("/group/:groupId/balance" , userAuthentication.authUser , expenceController.getGroupBalance);

router.get("/group/:groupId/summary" , userAuthentication.authUser , expenceController.getGroupSummary);

module.exports= router;