// import { MongoClient } from "mongodb";
// import { env } from "./env.js";

// export const dbClients = new MongoClient(env.MONGODB_URL);
//connect to the database server.

import mongoose from "mongoose";
import { env } from "./env.js";

//*connecting to mongodb
export const MongooseDB = async () => {
  try {
    mongoose.connect(env.MONGODB_URL);
  } catch (error) {
    console.error(error);
  }
};
