import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import { IUserCard } from "../interfaces/User";

/**
 * Add a card to a user's collection
 */
export const addCardToCollection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, cardId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Example logic: Add or increment card
    const existing = user.cardCollection.find((item: IUserCard) => item.cardId === cardId);
    if (existing) {
      existing.quantity += 1;
    } else {
      user.cardCollection.push({ cardId, quantity: 1, condition: "mint" });
    }

    await user.save();
    res.status(200).json({ message: "Card added to collection", collection: user.cardCollection });
  } catch (error) {
    next(error); // Properly hand off errors
  }
};

/**
 * Get a user's card collection
 */
export const getUserCollection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: string = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ collection: user.cardCollection });
  } catch (error) {
    next(error);
  }
};


/**
 * Update a card from a user's collection
 */
export const updateCardInCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, cardId } = req.params;
    const { quantity, condition } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const card = user.cardCollection.find((c: IUserCard) => c.cardId?.toString() === cardId.toString());
    if (!card) {
      res.status(404).json({ message: "Card not found in collection" });
      return;
    }

    if (quantity !== undefined) card.quantity = quantity;
    if (condition !== undefined) card.condition = condition;

    await user.save();
    res.json({ message: "Card updated", card });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a card from a user's collection
 */
export const deleteCardFromCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, cardId } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.cardCollection = user.cardCollection.filter((c: IUserCard) => c.cardId !== cardId);
await user.save();


    res.json({ message: "Card removed from collection" });
  } catch (error) {
    next(error); 
  }
};




