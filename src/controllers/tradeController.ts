import { Request, Response, NextFunction } from "express";
import TradeOffer from "../models/TradeOfferModel";
import User from "../models/User";
import mongoose from "mongoose";


// Create a new trade offer
export const createTradeOffer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { senderId, receiverId, senderCards, receiverCards } = req.body;

    if (!senderId || !receiverId || !Array.isArray(senderCards) || !Array.isArray(receiverCards)) {
      res.status(400).json({ message: "Invalid trade data" });
      return;
    }

    const trade = await TradeOffer.create({
      senderId,
      receiverId,
      senderCards,
      receiverCards,
    });

    res.status(201).json(trade);
  } catch (err) {
    console.error("Failed to create trade offer:", err);
    next(err); // Pass the error to the next middleware
  }
};

// Get all trade offers involving a user
export const getTradeOffersForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const objectId = new mongoose.Types.ObjectId(userId); // Convert string to ObjectId

    const trades = await TradeOffer.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate('senderId', 'username') // ✅ Get sender username
      .populate('receiverId', 'username') // ✅ Get receiver username
      .sort({ createdAt: -1 });
    

    res.status(200).json(trades);
  } catch (err) {
    console.error("Failed to fetch trades:", err);
    next(err);
  }
};




export const acceptTradeOffer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("✅ acceptTradeOffer endpoint hit");

  try {
    const tradeId = req.params.tradeId;
    const trade = await TradeOffer.findById(tradeId);

    if (!trade || trade.status !== "pending") {
      res.status(400).json({ message: "Trade not found or not pending" });
      return;
    }

    const sender = await User.findById(trade.senderId);
    const receiver = await User.findById(trade.receiverId);

    if (!sender || !receiver) {
      res.status(404).json({ message: "Sender or receiver not found" });
      return;
    }

    for (const card of trade.senderCards) {
      const quantity = card.quantity ?? 1;
      const senderCard = sender.cardCollection.find(c => c.cardId === card.cardId);
      if (!senderCard || senderCard.quantity < quantity) {
        res.status(400).json({ message: `Sender doesn't have enough of card ${card.cardId}` });
        return;
      }
    }

    for (const card of trade.receiverCards) {
      const quantity = card.quantity ?? 1;
      const receiverCard = receiver.cardCollection.find(c => c.cardId === card.cardId);
      if (!receiverCard || receiverCard.quantity < quantity) {
        res.status(400).json({ message: `Receiver doesn't have enough of card ${card.cardId}` });
        return;
      }
    }

    // Perform sender → receiver transfer
    for (const card of trade.senderCards) {
      const quantity = card.quantity ?? 1;
      const senderCard = sender.cardCollection.find(c => c.cardId === card.cardId);
      if (senderCard) senderCard.quantity -= quantity;

      const receiverCard = receiver.cardCollection.find(c => c.cardId === card.cardId);
      if (receiverCard) {
        receiverCard.quantity += quantity;
      } else {
        receiver.cardCollection.push({
          cardId: card.cardId,
          quantity,
          condition: "mint",
        });
      }
    }

    // Perform receiver → sender transfer
    for (const card of trade.receiverCards) {
      const quantity = card.quantity ?? 1;
      const receiverCard = receiver.cardCollection.find(c => c.cardId === card.cardId);
      if (receiverCard) receiverCard.quantity -= quantity;

      const senderCard = sender.cardCollection.find(c => c.cardId === card.cardId);
      if (senderCard) {
        senderCard.quantity += quantity;
      } else {
        sender.cardCollection.push({
          cardId: card.cardId,
          quantity,
          condition: "mint",
        });
      }
    }

    trade.status = "accepted";
    trade.updatedAt = new Date();
    await sender.save();
    await receiver.save();
    await trade.save();

    res.status(200).json({ message: "Trade accepted", trade });
  } catch (err) {
    console.error("Failed to accept trade offer:", err);
    next(err);
  }
};


export const declineTradeOffer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tradeId = req.params.tradeId;
    const trade = await TradeOffer.findById(tradeId);

    if (!trade) {
      res.status(404).json({ message: "Trade not found" });
      return;
    }

    if (trade.status !== "pending") {
      res.status(400).json({ message: "Only pending trades can be declined" });
      return;
    }

    trade.status = "declined";
    trade.updatedAt = new Date();
    await trade.save();

    res.status(200).json({ message: "Trade declined", trade });
  } catch (err) {
    console.error("Failed to decline trade offer:", err);
    next(err);
  }
};



