const { Schema, model } = require("mongoose");

const todoListSchema = new Schema(
  {
    todoListName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

const todoList = model("TodoList", todoListSchema);
module.exports = todoList;
