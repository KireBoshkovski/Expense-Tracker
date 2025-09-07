import { Request, Response } from "express";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { Types } from "mongoose";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.refreshTokens.push(refreshToken);
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already used!" });
    }
    user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const RefreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ error: "No refresh token provided" });
    }
    const decoded = verifyRefreshToken(token);
    const user = await User.findOne({ _id: decoded.id });
    if (!user || !user.refreshTokens.includes(token)) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }
    const newAccessToken = generateAccessToken(
      (user._id as Types.ObjectId).toString(),
    );
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.sendStatus(204);
    }

    const user = await User.findOne({ refreshTokens: token });
    if (user) {
      user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
      await user.save();
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
