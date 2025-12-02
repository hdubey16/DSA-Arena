import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.VITE_MONGODB_DB || 'javaprep_arena';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}
