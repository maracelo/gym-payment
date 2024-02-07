import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function accessToken(req: Request, res: Response){
    const refreshToken = req.headers.authorization!.split(' ')[1];

    if(refreshToken && refreshToken != 'undefined'){
        
        let adminId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    
        if(adminId){
            if(typeof adminId != 'string') adminId = adminId.adminId;

            const accessToken = jwt.sign({adminId}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'});
        
            return res.json({accessToken});
        }
    }

    res.status(401).json({err: 'Unauthorized'});
}