import express from "express";
import {
  createTradeOffer,
  getTradeOffersForUser,
  acceptTradeOffer,
  declineTradeOffer,
} from "../controllers/tradeController";

const router = express.Router();

// Only pass the function reference (DON'T CALL IT)
router.post("/", createTradeOffer);
router.get("/:userId", getTradeOffersForUser);
router.patch("/:tradeId/accept", acceptTradeOffer); // ✅
router.patch("/:tradeId/decline", declineTradeOffer); // ✅

export default router;
