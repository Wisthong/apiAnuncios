const express = require("express");
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
} = require("../controller/storages");
const { uploadMiddleware } = require("../utils/handleStorage");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const router = express.Router();

router.post("/", [checkAuth, checkRol(["admin"]),uploadMiddleware.single("myFile")], createItem);

router.get("/", getItems);

router.get("/:id", getItem);

router.delete("/:id", deleteItem);

module.exports = router;
