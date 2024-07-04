import mongoose from "mongoose";

let isConnected = false;
export const connectToDb = async () => {
  if (isConnected) {
    return;
  }
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    return console.log(`No connection string`);
  }
  const connectionInstance = await mongoose.connect(MONGODB_URI!);
  mongoose.connection.on("connected", () => {
    isConnected = true;
    console.log(`Db connected`);
  });
};
