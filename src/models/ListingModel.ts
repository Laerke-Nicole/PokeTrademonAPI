import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cardId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["active", "sold", "cancelled"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Listing", listingSchema);
