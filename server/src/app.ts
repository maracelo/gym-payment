import express, { NextFunction, Request, Response } from "express";
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
app.use((err: any, req: Request, res: Response, next: NextFunction) =>{
    if(err && (err.name === 'AuthenticationError' || err.name === 'JsonWebTokenError')) return res.status(401).json({err: 'Unauthorized'});
    
    console.log('Error: ' + err);
    
    res.status(500).json({err: 'System error'});
});

app.use((req: Request, res: Response) =>{
    res.status(404).json({err: 'Route not found'});
});

export default app;