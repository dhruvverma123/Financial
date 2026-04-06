const bcrypt = require("bcrypt");

const encryption = async (password) => {
  let genSalt = await bcrypt.genSalt(10);

  let hasedPass = await bcrypt.hash(password, genSalt);
  return hasedPass;
};

module.exports = encryption;
