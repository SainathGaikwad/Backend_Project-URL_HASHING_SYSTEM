const crypto = require("crypto");
const generateHash = () => {
  return crypto.randomBytes(6).toString("hex");
};

module.exports = generateHash;
