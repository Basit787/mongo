import { connect } from "mongoose";
import ENV from "../lib/env.js";

export const connectionString = ENV.DB_URL;

const connectDb = async (callback: (message: string) => void) => {
  try {
    await connect(connectionString);
    callback(`Database connected successfully = ${connectionString}`);
  } catch (error) {
    throw new Error(`Failed to connect database`, error as Error);
  }
};

export default connectDb;
