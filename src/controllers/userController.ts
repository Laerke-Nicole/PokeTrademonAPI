import UserModel from '../models/UserModel';
import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import { AuthRequest } from "../interfaces/AuthRequest";

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ _id: user._id, username: user.username });
  } catch (err) {
    console.error("Failed to get user by username:", err);
    next(err); // Forward the error
  }
};

export const checkUsernameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    res.status(400).json({ message: 'Username query param required' });
    return;
  }

  try {
    const user = await UserModel.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') }  // case-insensitive match
    });

    res.json({ exists: !!user });
  } catch (err) {
    console.error("Failed to check if username exists:", err);
    next(err);
  }
};

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { username, email, password } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Failed to update user profile:", err);
    next(err);
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.deleteOne();
    res.status(200).json({ message: "Account deleted" });
  } catch (err) {
    console.error("Failed to delete user:", err);
    next(err);
  }
};

