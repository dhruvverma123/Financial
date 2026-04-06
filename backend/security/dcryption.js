const bcrypt = require("bcrypt");

const dcryption = async (enteredPassword, hashedPassword) => {
  const result = await bcrypt.compare(enteredPassword, hashedPassword);
  return result;
};

module.exports = dcryption;
