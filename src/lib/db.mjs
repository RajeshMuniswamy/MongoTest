import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("DB connection Error ", error);
  }
};
