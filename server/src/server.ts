import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mainRoutes from "./routes/index";
import MongoConnect from "./database/mongo";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();

app.use( cors({ origin: '*'/* process.env.ORIGIN_ALLOWED */, methods: 'GET,POST,PUT,DELETE' }) );
app.use( express.static(path.join(__dirname, '../public')) );
app.use( express.urlencoded({ extended: true }) );

app.use('/api', mainRoutes);

app.use((req: Request, res: Response) =>{
    res.status(404).json({err: 'Not found'});
});

app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.BASE_URL}`)
});
MongoConnect();