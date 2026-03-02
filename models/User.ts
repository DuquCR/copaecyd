import { Schema, model, models } from "mongoose";

export interface IUser {
  email: string;
  name?: string;
  role: "admin" | "viewer";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ["admin", "viewer"], default: "viewer" },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>("User", UserSchema);
