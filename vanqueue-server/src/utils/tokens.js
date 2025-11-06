const jwt = require("jsonwebtoken");
const config = require("../config/env");

const createToken = (payload) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

module.exports = {
  createToken,
};
