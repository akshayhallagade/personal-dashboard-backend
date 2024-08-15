const { validateUserToken } = require("../lib/user");

function authenticationHeader() {
  return function (req, res, next) {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      req.userId = validateUserToken(token);
    }
    next();
  };
}

module.exports = { authenticationHeader };
