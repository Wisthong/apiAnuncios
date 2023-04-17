const express = require("express");
const { validatorPost } = require("../validators/post");
const { createItem } = require("../controller/posts");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const router = express.Router();

router.post("/", [checkAuth, checkRol(["admin"]), validatorPost], createItem);

module.exports = router;
