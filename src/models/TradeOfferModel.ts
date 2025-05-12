import mongoose, { Schema, Document } from "mongoose";

interface ITradeCard {
  cardId: string;
  quantity: number;
}

export interface ITradeOffer extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId?: mongoose.Types.ObjectId;
  senderCards: ITradeCard[];
  receiverCards: ITradeCard[];
  status: "pending" | "accepted" | "declined" | "cancelled";
  isOpenOffer: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tradeOfferSchema = new Schema<ITradeOffer>({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  senderCards: [
    {
      cardId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  receiverCards: [
    {
      cardId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "cancelled"],
    default: "pending",
  },
  isOpenOffer: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITradeOffer>("TradeOffer", tradeOfferSchema);
