const { hash, compare } = require("bcryptjs");

const encryptPassword = async (password) => {
  return await hash(password, 10);
};

const comparePassword = async (password, encriptPassword) => {
  return compare(password, encriptPassword);
};

module.exports = { encryptPassword, comparePassword };