import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db"; 
import routes from "./routes"; 
import { setupSwagger } from "./config/swagger";

dotenv.config();
const app = express();

// ✅ Set up Swagger documentation
setupSwagger(app);

// ✅ Middleware
app.use(express.json()); 
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS configuration
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

// ✅ Mount All Routes at `/api`
app.use("/api", routes);

// ✅ // Health check
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

export default app;
