const express = require("express");
const { validatorPost } = require("../validators/post");
const { createPost, getPosts } = require("../controller/posts");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const router = express.Router();

router.post("/", [checkAuth, checkRol(["admin"]), validatorPost], createPost);

router.get("/", getPosts);

module.exports = router;
