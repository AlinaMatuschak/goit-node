const express = require("express");
const router = express.Router();

const getCurrentUser = require("./getCurrentUser");
const getContacts = require("./getContacts");
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const deleteUser = require("./deleteUser");
const patchUser = require("./patchUser");
const checkToken = require("../middleware/checkToken");

router.get("/current", checkToken, getCurrentUser);
router.get("/contacts", getContacts);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkToken, logout);
router.delete("/users", deleteUser);
router.patch("/users", patchUser);

module.exports = router;
