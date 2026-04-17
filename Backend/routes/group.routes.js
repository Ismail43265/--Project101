const express= require("express");

const groupController= require("../controllers/group.controllers");
const userAuthentication= require("../middlewares/auth.middleware");

const router=express.Router();

router.post("/", userAuthentication.authUser ,groupController.createGroup);

router.get("/", userAuthentication.authUser, groupController.getUserGroups);

router.get("/:id", userAuthentication.authUser, groupController.getGroupDetail);

router.post("/:id/member", userAuthentication.authUser, groupController.addMember);

router.post("/:id/member/:userId", userAuthentication.authUser, groupController.removeMember);

export default router;