import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mainRoutes from "./routes/index";
import path from "path";
import cors from "cors";
import passport from "passport";
import "./middleware/passport_jwt";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(passport.initialize());

app.use( cors({ origin: process.env.ORIGIN_ALLOWED, methods: 'GET,POST,PUT,DELETE', credentials: true }) );
app.use( express.static(path.join(__dirname, '../public')) );
app.use( express.json() );
app.use( express.urlencoded({ extended: true })); //   TEMP JUST FOR TESTS     []
app.use(cookieParser());

app.use('/api', mainRoutes);

app.use((req: Request, res: Response) =>{
    res.status(404).json({err: 'Route not found'});
});

export default app;