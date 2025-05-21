import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel";
import connectDB from "../config/db";
import { validateUserRegistration, validateUserLogin } from "../utils/validationSchemas";
import { generateToken } from "../utils/jwt";
// import { verifyRecaptcha } from "../utils/recaptcha";

/**
 *  Register a new user
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    /*
    // verify reCAPTCHA token
    const { recaptchaToken } = req.body;
    if (!recaptchaToken) {
      res.status(400).json({ error: "reCAPTCHA token missing." });
      return;
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      res.status(403).json({ error: "Failed reCAPTCHA verification." });
      return;
    }
*/
  
    const { error } = validateUserRegistration(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    await connectDB();

    const emailExist = await UserModel.findOne({ email: req.body.email });
    if (emailExist) {
      res.status(400).json({ error: "Email already exists." });
      return;
    }

    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cardCollection: []
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully!", userId: savedUser._id });

  } catch (error) {
    res.status(500).json({ message: "Error while registering the user.", error });
  }
};

/**
 *  Login an existing user
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    await connectDB();

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).json({ error: "Email or password is incorrect." });
      return;
    }

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful!", token, userId: user._id });

  } catch (error) {
    res.status(500).json({ message: "Error while logging in.", error });
  }
};
