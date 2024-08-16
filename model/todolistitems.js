const { Schema, model } = require("mongoose");

const listItemSchema = new Schema(
  {
    todoName: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    todoListId: {
      type: Schema.Types.ObjectId,
      ref: "TodoList",
    },
  },
  { timestamp: true }
);

const listItem = model("ListItem", listItemSchema);
module.exports = listItem;
