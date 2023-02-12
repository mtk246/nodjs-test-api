const { EnvConfig } = require("../config/env_config");

const jwt = require("jsonwebtoken");
const { logError } = require("./logger");
exports.GenerateJWT = (user_id, roles,channel_id) => {

  const token = jwt.sign(
    { user_id: user_id, roles: roles, channel_id: channel_id,role: "customer"},
    process.env[EnvConfig.JWT_KEY],
    {
      expiresIn: "30d",
    }
  );
  return token;
};

exports.VerifyJWT = (req,token) => {
    try {
        const decoded = jwt.verify(token, process.env[EnvConfig.JWT_KEY]);
        req.user = decoded;
        return req
    } catch (err) {
        logError(err)
        req.jwterr = err
        return false
    }
};
