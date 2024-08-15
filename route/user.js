const express = require("express");
const { handleLogIn, handleSignUp } = require("../controllers/user");
const router = express.Router();

router.get("/");
router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);

module.exports = router;
