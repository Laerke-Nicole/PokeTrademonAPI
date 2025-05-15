import { Request } from "express";
import { IUserDocument } from "../models/UserModel";

export interface AuthRequest extends Request {
  user?: IUserDocument;
}
