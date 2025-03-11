import { Request, Response } from "express";
import Trade from "../models/Trade";

export const createTrade = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, offeredCards, requestedCards } = req.body;
    const trade = new Trade({ senderId, receiverId, offeredCards, requestedCards, status: "pending" });
    await trade.save();
    res.status(201).json({ message: "Trade request sent" });
  } catch (error) {
    res.status(500).json({ message: "Error creating trade" });
  }
};

export const updateTradeStatus = async (req: Request, res: Response) => {
  try {
    const { tradeId, status } = req.body;
    const trade = await Trade.findById(tradeId);
    if (!trade) return res.status(404).json({ message: "Trade not found" });

    trade.status = status;
    await trade.save();
    res.json({ message: `Trade ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating trade" });
  }
};
