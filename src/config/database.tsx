import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //if the database is already connected,don't connect again

  if (connected) {
    console.log("MongoDB is already connected....");
    return;
  }

  //connect to MongoDB
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }
    await mongoose.connect(uri);
    connected = true;

    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
