import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/UserModel";
import { IUserPayload } from "../interfaces/User";

export const generateToken = (user: IUserDocument): string => {
  const payload: IUserPayload = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2h"
  });
};

export const verifyToken = (token: string): IUserPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as IUserPayload;
  } catch {
    return null;
  }
};
