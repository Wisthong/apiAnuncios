const express = require("express");
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
} = require("../controller/posters");
// const { uploadMiddleware } = require("../utils/handleStorage");
const { uploadMiddleware } = require("../utils/handleStorageGalery");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const { validatorPoster, validatorID } = require("../validators/post");
const router = express.Router();

router.post(
  "/",
  [checkAuth, checkRol(["admin", "master"]), validatorPoster],
  createItem
);

router.get("/", getItems);

router.get("/:id", [validatorID], getItem);

router.delete(
  "/:id",
  [checkAuth, checkRol(["admin", "master"]), validatorID],
  deleteItem
);

module.exports = router;
