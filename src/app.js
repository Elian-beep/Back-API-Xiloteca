import express from "express";
import db from './config/dbConnect.js';
import routes from "./routes/index.js";
import cors from 'cors';

db.on("error", console.log.bind(console, 'Connection error'));
db.once("open", () => {
    console.log('Connection sucess');
})

const app = express();
app.use(cors({
    origin: '*'
}))
app.use(express.json())
routes(app);

export default app;