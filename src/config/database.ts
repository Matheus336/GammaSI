import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;
const dbName = process.env.DATABASE as string;

export async function connectDB() {
  try {
    await mongoose.connect(uri, { dbName });
    console.log(`📦 MongoDB conectado ao banco: ${dbName}`);
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
  }
}
