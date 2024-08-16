const { z } = require("zod");

function validateListItem(payload) {
  const listitemSchema = z.object({
    todoName: z.string(),
    status: z.boolean(),
    todoListId: z.string(),
  });
  return listitemSchema.safeParse(payload);
}

module.exports = { validateListItem };
