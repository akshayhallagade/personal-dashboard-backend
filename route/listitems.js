const express = require("express");
const {
  handleAddItem,
  handleUpdateItem,
  handleDeleteItem,
} = require("../controllers/todolistitem");
const router = express.Router();

router.post("/:id", handleAddItem);
router.put("/:id", handleUpdateItem);
router.delete("/:id", handleDeleteItem);

module.exports = router;
