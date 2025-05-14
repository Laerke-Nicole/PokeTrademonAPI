import { Types } from "mongoose";

export interface ITradeCard {
  cardId: string;
  quantity: number;
}

export interface ITradeOffer {
  senderId: Types.ObjectId;
  receiverId?: Types.ObjectId;
  senderCards: ITradeCard[];
  receiverCards: ITradeCard[];
  status: "pending" | "accepted" | "declined" | "cancelled";
  isOpenOffer: boolean;
  createdAt: Date;
  updatedAt: Date;
}
