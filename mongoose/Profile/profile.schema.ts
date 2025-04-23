import mongoose, { model, Schema, Document } from "mongoose";
import { ProfileInterface, UserRole } from "./profile.interface";
export const ProfileSchema = new Schema<ProfileInterface>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    organization: { type: String },
    department: { type: String },
    location: { type: String },
    mobile: { type: String },
    countryCode: { type: String },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
