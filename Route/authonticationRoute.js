const express = require("express");
const controller = require("./../controller/authonticationController");
const router = express.Router();

router.post("/login", controller.login);

module.exports = router;
