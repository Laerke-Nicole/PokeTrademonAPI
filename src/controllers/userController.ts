import UserModel from '../models/UserModel';
import { Request, Response, NextFunction } from 'express';

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

