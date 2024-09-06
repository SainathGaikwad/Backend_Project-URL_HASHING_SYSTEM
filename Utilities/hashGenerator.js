const crypto = require("crypto");
// This function generates the random hash for the corresponding url to uniquely identify it.
const generateHash = () => {
   return crypto.randomBytes(6).toString('hex');
}

module.exports = generateHash;
