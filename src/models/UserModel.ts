import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from '../interfaces/User';

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId; 
}
const UserSchema = new Schema<IUserDocument>({
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

const UserModel = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
