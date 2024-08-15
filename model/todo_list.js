const todoList = new Schema(
  {
    todoListName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const todo_list = model("todoList", todoList);
module.exports = todo_list;
