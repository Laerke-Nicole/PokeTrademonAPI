import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db"; 
import routes from "./routes"; // ✅ Use centralized routes

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json()); 
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Connect to MongoDB
connectDB();

// ✅ Mount All Routes at `/api`
app.use("/api", routes);

// ✅ Default route to check if API is running
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

export default app;
