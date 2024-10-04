// src/config/dbConfig.ts
import { MongoClient, Db } from 'mongodb';

export async function connectToDB(): Promise<Db> {
  const dbURI = process.env.MONGO_URI;

  if (!dbURI) {
    throw new Error('MONGO_URI is not defined in environment variables.');
  }

  const client = new MongoClient(dbURI);
  await client.connect();
  const db = client.db();
  console.log('Connected to MongoDB');
  return db;
}
