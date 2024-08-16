const { z } = require("zod");

function validateListSchema(payload) {
  const todoListSchema = z.object({
    todoListName: z.string(),
    userId: z.string(),
  });
  return todoListSchema.safeParse(payload);
}

module.exports = { validateListSchema };
