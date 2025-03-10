const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

async function comparePassword(enteredPassword, storedHashedPassword) {
  if (await bcrypt.compare(enteredPassword, storedHashedPassword)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
