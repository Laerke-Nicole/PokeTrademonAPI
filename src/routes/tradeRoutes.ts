import express from "express";

const router = express.Router();

// ✅ Example Route (Modify as needed)
router.get("/", (req, res) => {
  res.json({ message: "Trade routes are working!" });
});

export default router; // ✅ Ensure this export exists
