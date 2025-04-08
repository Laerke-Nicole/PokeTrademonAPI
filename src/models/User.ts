import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/User";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pokecoins: { type: Number, default: 1000 }, // Initial wallet
  collection: {
    type: [
      {
        cardId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        condition: { type: String, default: "mint" }, // optional, can be used for trading logic
      },
    ],
    default: [],
  },
});

export default mongoose.model("User", UserSchema);
