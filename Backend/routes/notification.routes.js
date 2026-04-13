const express = require("express");
const router = express.Router();
const {authUser}=require("../middlewares/auth.middleware")

const {
    getNotifications,
    markAsRead
} = require("../controllers/notificationController");


router.get("/", authUser, getNotifications);
router.patch("/:id/read", authUser, markAsRead);


module.exports = router;