import express from "express";

const router = express.Router();

// ✅ Example Route (Modify as needed)
router.get("/", (req, res) => {
  res.json({ message: "Collection routes are working!" });
});

export default router; // ✅ Ensure this export exists
