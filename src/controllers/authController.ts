import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi, { ValidationResult } from "joi";
import User from "../models/User";
import { IUser } from "../interfaces/User";
import connectDB from "../config/db"; // Ensure proper MongoDB handling
import { AuthRequest } from "../interfaces/AuthRequest"; // Import the extended Request type

/**
 * ✅ Validation Schema for User Registration
 */
const validateUserRegistration = (data: IUser): ValidationResult => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
};

/**
 * ✅ Validation Schema for User Login
 */
const validateUserLogin = (data: { email: string; password: string }): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
};

/**
 * ✅ Register a new user
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input data
        const { error } = validateUserRegistration(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        await connectDB();

        // Check if email already exists
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            res.status(400).json({ error: "Email already exists." });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create and save new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            collection: []
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully!", userId: savedUser._id });

    } catch (error) {
        res.status(500).json({ message: "Error while registering the user.", error });
    }
};

/**
 * ✅ Login an existing user
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate login input
        const { error } = validateUserLogin(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        await connectDB();
        const user = await User.findOne({ email: req.body.email });

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            res.status(400).json({ error: "Email or password is incorrect." });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "2h" }
        );

        res.status(200).json({ message: "Login successful!", token });

    } catch (error) {
        res.status(500).json({ message: "Error while logging in.", error });
    }
};

/**
 * ✅ Middleware: Verify JWT & Attach User to Request
 */
export const securityToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("auth-token");

    if (!token) {
        res.status(400).json({ error: "Access Denied. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
        req.user = decoded; // ✅ TypeScript now recognizes `user`
        next();
    } catch {
        res.status(401).json({ message: "Invalid Token" });
    }
};

