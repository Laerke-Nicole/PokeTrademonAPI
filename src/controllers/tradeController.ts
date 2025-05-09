import { Request, Response, NextFunction } from "express";
import TradeOffer from "../models/TradeOfferModel";
import UserModel, { IUserCard } from "../models/UserModel";

export const createTradeOffer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      senderId,
      receiverUsername,
      senderCards,
      receiverCards,
      isOpenOffer = false
    } = req.body;

    if (!senderId || !senderCards || !receiverCards) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    let receiver = null;
    let receiverId = undefined;

    if (!isOpenOffer) {
      if (!receiverUsername) {
        res.status(400).json({ message: 'Receiver username required for direct trades' });
        return;
      }

      receiver = await UserModel.findOne({
        username: { $regex: new RegExp(`^${receiverUsername}$`, 'i') }
      });

      if (!receiver) {
        res.status(404).json({ message: 'Receiver user not found' });
        return;
      }

      receiverId = receiver._id;
    }

    const newTrade = await TradeOffer.create({
      senderId,
      receiverId,
      senderCards,
      receiverCards,
      status: 'pending',
      isOpenOffer
    });

    res.status(201).json(newTrade);
  } catch (err) {
    console.error('Failed to create trade offer:', err);
    next(err);
  }
};

export const getOpenTradeOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const openTrades = await TradeOffer.find({ isOpenOffer: true, status: 'pending' })
      .populate('senderId', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(openTrades);
  } catch (err) {
    console.error("Failed to fetch open trade offers:", err);
    next(err);
  }
};

export const getTradeOffersForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;

    const trades = await TradeOffer.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate('senderId', 'username')
      .populate('receiverId', 'username')
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
    const currentUserId = req.body.userId;

    console.log("Trade ID:", tradeId);
console.log("Incoming userId:", currentUserId);

    if (!currentUserId) {
      res.status(400).json({ message: "Missing userId" });
      return;
    }
    console.log("✅ userId received:", currentUserId);


    const trade = await TradeOffer.findById(tradeId);

    if (!trade || trade.status !== "pending") {
      res.status(400).json({ message: "Trade not found or not pending" });
      return;
    }

    // 🔐 Handle open trades
    if (trade.isOpenOffer && !trade.receiverId) {
      trade.receiverId = currentUserId;
    }

    // 🔐 Enforce authorization
    if (!trade.isOpenOffer && trade.receiverId?.toString() !== currentUserId) {
      res.status(403).json({ message: "You are not authorized to accept this trade" });
      return;
    }

    const sender = await UserModel.findById(trade.senderId);
    const receiver = await UserModel.findById(trade.receiverId);

    if (!sender || !receiver) {
      res.status(404).json({ message: "Sender or receiver not found" });
      return;
    }

    const findCard = (cards: IUserCard[], id: string) =>
      cards.find((card) => card.cardId === id);

    // ✅ Check sender has the cards
    for (const card of trade.senderCards) {
      const senderCard = findCard(sender.cardCollection, card.cardId);
      if (!senderCard || senderCard.quantity < card.quantity) {
        res.status(400).json({ message: `Sender lacks card ${card.cardId}` });
        return;
      }
    }

    // ✅ Check receiver has the cards
    for (const card of trade.receiverCards) {
      const receiverCard = findCard(receiver.cardCollection, card.cardId);
      if (!receiverCard || receiverCard.quantity < card.quantity) {
       res.status(400).json({ message: `You don't have enough of card ${card.cardId}` });
       return;
      }
    }

    // 🔄 Transfer sender → receiver
    for (const card of trade.senderCards) {
      const quantity = card.quantity;
      const senderCard = findCard(sender.cardCollection, card.cardId);
      if (senderCard) senderCard.quantity -= quantity;

      const receiverCard = findCard(receiver.cardCollection, card.cardId);
      if (receiverCard) {
        receiverCard.quantity += quantity;
      } else {
        receiver.cardCollection.push({ cardId: card.cardId, quantity, condition: "mint" });
      }
    }

    // 🔄 Transfer receiver → sender
    for (const card of trade.receiverCards) {
      const quantity = card.quantity;
      const receiverCard = findCard(receiver.cardCollection, card.cardId);
      if (receiverCard) receiverCard.quantity -= quantity;

      const senderCard = findCard(sender.cardCollection, card.cardId);
      if (senderCard) {
        senderCard.quantity += quantity;
      } else {
        sender.cardCollection.push({ cardId: card.cardId, quantity, condition: "mint" });
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
    const currentUserId = req.body.userId;

    const trade = await TradeOffer.findById(tradeId);

    if (!trade) {
      res.status(404).json({ message: "Trade not found" });
      return;
    }

    if (trade.status !== "pending") {
      res.status(400).json({ message: "Only pending trades can be declined" });
      return;
    }

    // ✅ Optional: block decline if user is not part of the trade
    const isSender = trade.senderId?.toString() === currentUserId;
    const isReceiver = trade.receiverId?.toString() === currentUserId;

    // For open offers (no receiverId), allow only the sender to cancel
    if (trade.isOpenOffer && !trade.receiverId) {
      if (!isSender) {
        res.status(403).json({ message: "Only the sender can cancel an open offer" });
        return;
      }
    } else {
      // For normal trades, allow either sender or receiver to decline
      if (!isSender && !isReceiver) {
        res.status(403).json({ message: "You are not part of this trade" });
        return;
      }
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
