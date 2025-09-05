import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "supersecretkey456";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as { id: string };
};
