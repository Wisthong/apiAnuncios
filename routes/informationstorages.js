const express = require("express");
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
} = require("../controller/informationstorages");
// const { uploadMiddleware } = require("../utils/handleStorage");
const { uploadMiddleware } = require("../utils/handleStorageGalery");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const { validatorGetPost } = require("../validators/post");
const router = express.Router();

router.post(
  "/",
  [checkAuth, checkRol(["admin", "master"]), uploadMiddleware.single("myFile")],
  createItem
);

router.get("/", getItems);

router.get("/:id", getItem);

router.delete("/:id", [checkAuth, checkRol(["admin", "master"])], [validatorGetPost], deleteItem);

module.exports = router;
