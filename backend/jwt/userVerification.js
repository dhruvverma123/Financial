const verifyToken = require("./verifyToken");

const userVerification = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    req.user = null;
    return next();
  } else {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    return next();
  }
};

module.exports = userVerification;
