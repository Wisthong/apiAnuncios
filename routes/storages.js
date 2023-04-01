const express = require("express");
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
} = require("../controller/storages");
const { uploadMiddleware } = require("../utils/handleStorage");
const router = express.Router();

router.post("/", uploadMiddleware.single("myFile"), createItem);

router.get("/", getItems);

router.get("/:id", getItem);

router.delete("/:id", deleteItem);

module.exports = router;
