const express = require("express");
const router = express.Router();

const getCurrentUser = require("./getCurrentUser");
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const checkToken = require("../middleware/checkToken");

router.get("/current", checkToken, getCurrentUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkToken, logout);

module.exports = router;
