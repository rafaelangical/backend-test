import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const connect = async () => {
  const mongoServerConnection = await MongoMemoryServer.create();
  const mongoUri = mongoServerConnection.getUri();

  await mongoose.connect(mongoUri, { dbName: "backend-test" });
  console.log(`Connected mongoDB success on ${mongoUri}`);
};
