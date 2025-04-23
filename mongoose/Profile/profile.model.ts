import mongoose, { model } from "mongoose";
import { ProfileSchema } from "./profile.schema";
import { ProfileInterface } from "./profile.interface";

export default mongoose.models.Profile || model<ProfileInterface>("Profile", ProfileSchema);
