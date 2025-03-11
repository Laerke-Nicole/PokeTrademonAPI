import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db"; 
import authRoutes from "./routes/authRoutes"; // ✅ Ensure this path is correct

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json()); // Ensure JSON body parsing
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Connect to MongoDB
connectDB();

// ✅ Fix: Use "/api" as a prefix like in your old API
app.use("/api/auth", authRoutes);

// ✅ Default route to check if API is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
