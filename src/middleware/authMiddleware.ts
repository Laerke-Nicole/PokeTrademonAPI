import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/AuthRequest";
import { IUser } from "../interfaces/User";

export const securityToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  console.log("📥 Request Headers:", req.headers);

  const token = req.header("auth-token");

  if (!token) {
    console.log("⛔ No token provided.");
    res.status(400).json({ error: "Access Denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
    req.user = decoded;
    console.log("✅ Token verified:", decoded);
    next();
  } catch (err) {
    console.log("❌ Invalid token:", err);
    res.status(401).json({ message: "Invalid Token" });
  }
};
