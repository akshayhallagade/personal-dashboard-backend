const { validateListItem } = require("../lib/listitems");
const listItem = require("../model/todolistitems");

// Adding Item
const handleAddItem = async (req, res) => {
  // validating
  const safeParseData = validateListItem({
    todoName: req.body.todoName,
    status: req.body.status,
    todoListId: req.params.id,
  });
  if (safeParseData.error)
    return res.json({ message: "Data validation Failed" });

  // Adding Item
  const newlistitem = await listItem.create(safeParseData.data);
  return res.json({ message: "new list items added", dataId: newlistitem._id });
};

// Updating Item
const handleUpdateItem = async (req, res) => {
  //Validating
  const safeparseData = validateListItem({
    todoName: req.body.todoName,
    status: req.body.status,
    todoListId: req.params.id,
  });
  if (safeparseData.error) res.json({ message: "data validation failed" });
  //Updating
  const newItem = await listItem.findByIdAndUpdate(
    req.params.id,
    safeparseData.data
  );
  return res.json({ message: "item Updated", id: newItem._id });
};

// Deleting Item
const handleDeleteItem = async (req, res) => {
  const itemId = req.params.id;
  const deletedItem = await listItem.findByIdAndDelete(itemId);
  return res.json({
    message: "item deleted successfully",
    id: deletedItem._id,
  });
};

module.exports = { handleAddItem, handleUpdateItem, handleDeleteItem };
