const jwt = require("jsonwebtoken");

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

module.exports = generateTokenAndSetCookies;
