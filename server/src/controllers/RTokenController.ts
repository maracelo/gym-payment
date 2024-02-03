import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function accessToken(req: Request, res: Response){
    const refreshToken = req.headers.authorization!.split(' ')[1];

    if(refreshToken && refreshToken != 'undefined'){
        
        let userId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    
        if(userId){
            if(typeof userId != 'string')userId = userId.userId;

            const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'}); // error right here
        
            return res.json({accessToken});
        }
    }

    res.status(401).json({error: 'Not authorized'});
}