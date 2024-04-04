import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin";

dotenv.config();

export async function refresh(req: Request, res: Response){
    const refreshToken = req.headers['refresh-token'];

    if(refreshToken && typeof refreshToken === 'string'){
        
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    
        if(typeof decoded !== 'string' && 'adminId' in decoded){
            const adminId = decoded.adminId;

            const admin = await Admin.findOne({_id: adminId});

            if(!admin) return res.status(404).json({err: 'Admin not found'});

            const accessToken = jwt.sign({adminId, name: admin.name, profile_pic: admin.profile_pic}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'});
        
            return res.json({accessToken});
        }
    }

    res.status(401).json({err: 'Unauthorized'});
}