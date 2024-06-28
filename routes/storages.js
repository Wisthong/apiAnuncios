const express = require("express");
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
} = require("../controller/storages");
// const { uploadMiddleware } = require("../utils/handleStorage");
const { uploadMiddleware } = require("../utils/handleStorageCloudinary");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const router = express.Router();
const { validatorID } = require("../validators/post");

router.post(
  "/",
  [checkAuth, checkRol(["admin", "master"]), uploadMiddleware.single("myFile")],
  createItem
);

router.get("/", getItems);

router.get("/:id", getItem);

router.delete(
  "/:id",
  [checkAuth, checkRol(["admin", "master"]), [validatorID]],
  deleteItem
);

module.exports = router;
