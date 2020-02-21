const express = require("express");
const router = express.Router();

const getUsers = require("./getUsers");
const register = require("./register");
const login = require("./login");

router.get("/users", getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
