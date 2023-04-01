import express from "express";
const router = express.Router();
const controller = require("../controller/googleCont");

router.get("/", controller.home);
router.get("/login", controller.googleLogin);
router.get("/auth/google/callback", controller.googleCallback);
router.get("/logout", controller.googleLogout);

module.exports = router;
