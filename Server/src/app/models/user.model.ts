import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";

const COLLECTION_NAME = "users";
const DOCUMENT_NAME = "User";

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role_admin: { type: Number, default: 1, enum: [1, 2] },
    role_subscription: { type: Number, default: 1, enum: [1, 2] },
    role_active: { type: Number, default: 1, enum: [1, 2] },
    avatar: { type: String, default: "./image/zyro-image (3).png" },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model<IUser>(DOCUMENT_NAME, UserSchema);
