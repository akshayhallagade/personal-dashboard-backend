const express = require("express");
const router = express.Router();

router.get("/");
router.post("/signup");
router.post("/signin");

module.exports = router;
