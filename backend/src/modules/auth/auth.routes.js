const { Router } = require("express");
const { login } = require("./auth.controller.js");

const router = Router();

router.post("/login", login);

module.exports = router;
