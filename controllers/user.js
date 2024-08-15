const User = require("../model/user");
const lib = require("../lib/user");

// Handler for Sign Up
const handleSignUp = async (req, res) => {
  // Checking validation
  const safeparseResult = lib.validateUserSignUp(req.body);
  if (safeparseResult.error) return res.json({ msg: "data validation failed" });
  try {
    const { firstName, lastName, email } = safeparseResult.data;

    // Creating hashedPassword using password and salt. ===> libraries used(Crypto, UUID)
    const { hashedPassword: hashedPassword, salt } = lib.generateHashed(
      safeparseResult.data.password
    );

    // Adding Data to Database
    const userDBData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    });

    // Generating Token
    const token = lib.generateUserToken({ id: userDBData._id.toString() });

    return res.json({
      msg: " User Signed up",
      id: userDBData._id,
      tok: token,
    });
  } catch (error) {
    // Showing Duplicate Key Error : Shows when same email used for signup.
    if (error.code === 11000)
      return res.status(400).json({ message: error.message });
    // Show for Other Error
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Handler for Sign in
const handleLogIn = async (req, res) => {
  // Checking validation
  const safeparseResult = lib.validateUserLogIn(req.body);
  if (safeparseResult.error) return res.json("Data Validation Failed.");

  try {
    const { email, password } = safeparseResult.data;
    //Getting Data from DB
    const userData = await User.findOne({ email });
    if (!userData)
      res.status(404).json({ message: "Credential Didn't Matched." });

    // DB data  ===  with Password
    const { hashedPassword } = lib.generateHashed(password, userData.salt);
    if (hashedPassword === userData.password)
      return res.json({ message: "Log In Successfully", userData });

    return res.json({ message: "Server Error" });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { handleSignUp, handleLogIn };
