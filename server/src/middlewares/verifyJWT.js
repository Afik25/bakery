const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config(path.join(__dirname, "", ".env"));

const verifyJWT = (req, res, next) => {
  const authHeader = req?.headers["authorization"];
  if (!authHeader)
    return res
      .status(401)
      .json({ mesage: "[REQUEST HEADERS]: headers authorization undefined!" });
  const token = authHeader.split(" ")[1];
  const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(token, access_token_secret, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "[JWT VERIFICATION]: jwt not verified!" });
    req.user = decoded.userInfo.user_id;
    next();
  });
};
module.exports = verifyJWT;
