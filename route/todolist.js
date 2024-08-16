const express = require("express");
const {
  handleGetAllListData,
  handleAddList,
  handleUpdateList,
  handleDeleteList,
} = require("../controllers/todolist");

const router = express.Router();
router.get("/", handleGetAllListData);
router.post("/", handleAddList);
router.put("/:id", handleUpdateList);
router.delete("/:id", handleDeleteList);

module.exports = router;
