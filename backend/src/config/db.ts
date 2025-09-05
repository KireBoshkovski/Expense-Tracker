import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb://root:example@localhost:27017/test?authSource=admin"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
