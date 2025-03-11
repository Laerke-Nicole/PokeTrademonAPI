import mongoose, { Schema, Document } from "mongoose";

export interface ITrade extends Document {
  senderId: string;
  receiverId: string;
  offeredCards: string[];
  requestedCards: string[];
  status: "pending" | "accepted" | "declined";
}

const TradeSchema = new Schema<ITrade>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  offeredCards: { type: [String], required: true },
  requestedCards: { type: [String], required: true },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
});

export default mongoose.model<ITrade>("Trade", TradeSchema);
