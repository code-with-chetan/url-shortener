import { dbClients } from "../config/db-clients.js";
import { env } from "../config/env.js";

const db = dbClients.db(env.MONGODB_DATABASE_NAME);
const shortenerCollections = db.collection("shorteners");

export const shortLinks = async () => {
  return shortenerCollections.find().toArray();
};

export const saveLinks = async (links) => {
  return shortenerCollections.insertOne(links);
};

export const getLinkByShortCode = async (shortCode) => {
  return await shortenerCollections.findOne({ shortCode: shortCode });
};
