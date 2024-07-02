import jwt from "jsonwebtoken";

export const generateTokens = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent xss attacks, javascript can't access it
    sameSite: "strict", //CSRF attacks cross-site cookie
    secure: process.env.NODE_ENV === "production", // https
  });
};
