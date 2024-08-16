const { validateListSchema } = require("../lib/todolist");
const Todolist = require("../model/todolist");

// get all the list data.
function handleGetAllListData(req, res) {
  const userId = req.userId;
  return res.json({ data: userId });
}

// Adding a list for user.
const handleAddList = async (req, res) => {
  // Validating Data
  const safeparseData = validateListSchema({
    todoListName: req.body.name,
    userId: req.userId,
  });

  if (safeparseData.error)
    return res.json({ message: "data validation Failed" });

  // Creating List
  const newList = await Todolist.create(safeparseData.data);
  return res
    .status(200)
    .json({ essage: "List Added Succeffully", dataId: newList._id });
};

// Updating a list.
const handleUpdateList = async (req, res) => {
  // UpdatedList
  const updatedList = { todoListName: req.body.name, userId: req.userId };
  const safeparseData = validateListSchema(updatedList);
  // Validating Data
  if (safeparseData.error)
    return res.json({
      message: "data validation Failed",
      error: safeparseData.error,
    });

  // Updating in Database
  const newList = await Todolist.findByIdAndUpdate(
    req.params.id,
    safeparseData.data
  );
  return res
    .status(200)
    .json({ message: "List Updated Succeffully", data: newList._id });
};

// Deleting the list.
const handleDeleteList = async (req, res) => {
  const deleteList = await Todolist.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ message: "List Deleted Succeffully", data: deleteList._id });
};

module.exports = {
  handleGetAllListData,
  handleAddList,
  handleUpdateList,
  handleDeleteList,
};
