const todo = new Schema(
  {
    todoName: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    todo_list: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const todos = model("todos", todo);
module.exports = todos;
