import Joi from "joi";
import { IUser } from "../interfaces/User";

export const validateUserRegistration = (data: IUser) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(data);
};

export const validateUserLogin = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(data);
};
