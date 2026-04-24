const express= require("express");

const groupController= require("../controllers/group.controllers");
const userAuthentication= require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer");

const router=express.Router();

router.post("/", userAuthentication.authUser , upload.single("avatar"), groupController.createGroup);

router.get("/", userAuthentication.authUser, groupController.getUserGroups);

router.get("/:id", userAuthentication.authUser, groupController.getGroupDetail);

router.post("/:id/member", userAuthentication.authUser, groupController.addMember);

router.delete("/:id/member/:userId", userAuthentication.authUser, groupController.removeMember);

module.exports= router;