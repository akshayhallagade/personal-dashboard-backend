const { z } = require("zod");
const { v4: uuidv4 } = require("uuid");
const { createHmac } = require("crypto");
const jwt = require("jsonwebtoken");

// Schema of user for Token
const validateUserTokenSchema = z.object({
  id: z.string(),
});

//validating user signup data
function validateUserSignUp(data) {
  const Schema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
  return Schema.safeParse(data);
}
//validating user signin data
function validateUserLogIn(data) {
  const Schema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });
  return Schema.safeParse(data);
}

// GenerateHashed Password
function generateHashed(password, salt = uuidv4()) {
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return { hashedPassword, salt };
}

//Generating Token
function generateUserToken(data) {
  const safeParseData = validateUserTokenSchema.safeParse(data);
  if (safeParseData.error) throw new Error(safeparseData.error);

  const token = jwt.sign(safeParseData.data, process.env.JWT_SECRET);
  return token;
}

module.exports = {
  validateUserSignUp,
  validateUserLogIn,
  generateUserToken,
  generateHashed,
};
