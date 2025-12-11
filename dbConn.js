import { MongoClient } from "mongodb";

let client;
let db;

export const connectDB = async () => {
  if (db) return db;

  client = await MongoClient.connect(process.env.MONGO_URI);
  db = client.db(process.env.DB_NAME);

  return db;
};
