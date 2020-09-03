const crypto = require("crypto");

module.exports = function (size) {
  return crypto.randomBytes(size).toString("hex");
};
