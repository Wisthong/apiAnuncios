const express = require("express");
const { validatorPost, validatorGetPost } = require("../validators/post");
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getPost,
} = require("../controller/posts");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const router = express.Router();

router.post(
  "/",
  [checkAuth, checkRol(["admin", "master"]), validatorPost],
  createPost
);

router.get("/", getPosts);

router.get("/:id", [validatorGetPost], getPost);

router.put(
  "/:id",
  [checkAuth, checkRol(["master"]), validatorPost, validatorGetPost],
  updatePost
);

router.delete(
  "/:id",
  [checkAuth, checkRol(["admin", "master"]), validatorGetPost],
  deletePost
);

module.exports = router;
