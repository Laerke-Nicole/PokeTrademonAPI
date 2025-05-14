import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/AuthRequest";
import { IUser } from "../interfaces/User";

export const securityToken = (req: AuthRequest, res: Response, next: NextFunction): void => {

  const token = req.header("auth-token");

  if (!token) {
    res.status(400).json({ error: "Access Denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
