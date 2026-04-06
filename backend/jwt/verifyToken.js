const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    let verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    return verifiedUser;
  } catch (err) {
    return null;
  }
};

module.exports = verifyToken;
