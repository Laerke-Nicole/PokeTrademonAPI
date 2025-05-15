import UserModel from "../models/UserModel";
import { IUserDocument } from "../models/UserModel"; // ✅ add this
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/AuthRequest";


export const securityToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(400).json({ error: "Access Denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };

    const user = await UserModel.findById(decoded._id);
    if (!user) {
      res.status(404).json({ message: "User not found from token" });
      return;
    }

    req.user = user as IUserDocument; // ✅ Full MongoDB user with ._id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
