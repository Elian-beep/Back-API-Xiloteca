import express from "express";
import db from './config/dbConnect.js';
import routes from "./routes/index.js";
import cors from 'cors';

db.on("error", console.log.bind(console, 'Connection error'));
db.once("open", () => {
    console.log('Connection sucess');
})

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://xilotecacesi.vercel.app, https://xilotecauea.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json())
routes(app);

export default app;