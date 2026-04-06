const User = require("../model/userModel");
const encryption = require("../security/encrytion");
const dcryption = require("../security/dcryption");
const generateToken = require("../jwt/generateToken");

module.exports.createUser = async (req, res) => {
  const { name, password, role, status, email } = req.body;

  const hashedPassword = await encryption(password);

  const user = new User({
    name: name,
    password: hashedPassword,
    role: role,
    status: status,
    email: email,
  });

  user.save();
  res.json({ response: "user created successfully" });
};

module.exports.login = async (req, res) => {
  let { password, email } = req.body;

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ response: "Incorrect email or Password" });
  }

  let checkPassword = await dcryption(password, user.password);

  if (checkPassword) {
    let token = generateToken(user._id);
    res.cookie("token", token);

    res.json({ response: "Logged in successfully", user });
  } else {
    res.json({ response: "Incorrect email or Password" });
  }
};
