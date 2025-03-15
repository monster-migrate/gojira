import mongoose from "mongoose";

const MONGO_ATLAS_URI = process.env.MONGO_URI;

async function dbConnect(): Promise<void> {
  if (!MONGO_ATLAS_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
  }

  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(MONGO_ATLAS_URI, {
      dbName: "gojira",
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    console.log("Connected to MongoDB Atlas.");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
}

export default dbConnect;