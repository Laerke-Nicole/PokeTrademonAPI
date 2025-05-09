import mongoose, { Schema, Document } from 'mongoose';

export interface IUserCard {
  cardId: string;
  quantity: number;
  condition: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  pokecoins: number;
  cardCollection: IUserCard[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pokecoins: { type: Number, default: 1000 },
  cardCollection: {
    type: [
      {
        cardId:    { type: String, required: true },
        quantity:  { type: Number, default: 1 },
        condition: { type: String, default: "mint" }
      }
    ],
    default: []
  }
});

// ✅ Prevent OverwriteModelError in dev environments
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
