import { Request } from "express";
import { IUser } from "./User"; // Import your IUser interface

export interface AuthRequest extends Request {
    user?: IUser;
}
