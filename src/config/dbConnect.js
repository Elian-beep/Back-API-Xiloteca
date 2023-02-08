import dotenv from "dotenv/config.js";
import mongoose from "mongoose";

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@xiloteca-cesit.quv7d2j.mongodb.net/xiloteca`);

let db = mongoose.connection;
export default db;