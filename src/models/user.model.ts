import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
interface RIDE extends Document {
  from: string;
  to: string;
  fare: string;
  isCompleted: boolean;
  user: mongoose.Types.ObjectId;
}
interface USER extends Document {
  name: string;
  email: string;
  password: string;
  ride: RIDE[];
}

const RideSchema: Schema<RIDE> = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  fare: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const UserSchema: Schema<USER> = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  ride: [],
});

const UserModel = mongoose.models?.User || mongoose.model("User", UserSchema);
const RideModel = mongoose.models?.Ride || mongoose.model("Ride", RideSchema);
export { UserModel, RideModel };
