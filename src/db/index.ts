import mongoose from "mongoose";
import { DB_NAME } from "../constants";

/** @type {typeof mongoose | undefined} */
export let dbInstance:any = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://damanpreet75way:"+process.env.MONGODB_PASSWORD+"@cluster75way.wyjw5dp.mongodb.net/"+DB_NAME);
    dbInstance = connectionInstance;
    console.log(
      `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;