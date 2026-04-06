const User = require("../model/userModel");

const checkAccessabilityForAnalyst = async (req, res, next) => {
  let user = await User.findById(req.user.id);
  if (user.role == "analyst" || user.role == "admin") {
    next();
  } else {
    res.json({
      response: "You do not have accessability for this api endpoint",
    });
  }
};

module.exports = checkAccessabilityForAnalyst;
