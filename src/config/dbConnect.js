import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kihan:Pass.Xiloteca.09@xiloteca-cesit.quv7d2j.mongodb.net/xiloteca");

let db = mongoose.connection;
export default db;