const express = require("express");
const { validatorPost, validatorID } = require("../validators/post");
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

router.get("/:id", [validatorID], getPost);

router.put(
  "/:id",
  [checkAuth, checkRol(["master"]), validatorPost, validatorID],
  updatePost
);

router.delete(
  "/:id",
  [checkRol(["admin", "master"]), validatorID],
  deletePost
);

module.exports = router;
