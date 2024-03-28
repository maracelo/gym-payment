import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import fs from "fs";

import Admin from '../models/Admin';
import RefreshToken from "../models/RefreshToken";

import updateAdminFilter from "../helpers/admin/updateAdminFilter";
import createAdminFilter from "../helpers/admin/createAdminFilter";

export async function login(req: Request, res: Response){
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({err: 'Field lefting'});

    if(!validator.isEmail(email)) return res.status(400).json({err: 'Invalid email or password'});

    const admin = await Admin.findOne({email});

    if(!admin || !bcrypt.compareSync(password, admin.password))
        return res.status(400).json({err: 'Invalid email or password'});

    const refreshToken = jwt.sign({adminId: admin.id}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '7d'});
    const accessToken =  jwt.sign(
        {adminId: admin.id, name: admin.name, profile_pic: admin.profile_pic},
        process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'}
    );

    const sevenDaysDate = new Date(Date.now() + 604800000);

    try{
        const hasRToken = await RefreshToken.findOneAndUpdate(
            {admin_id: admin.id}, {expiresin: sevenDaysDate, refresh_token: refreshToken}
        );
        
        if(!hasRToken)
            await RefreshToken.create({admin_id: admin.id, expiresin: sevenDaysDate, refresh_token: refreshToken});
        
        
        return res.json({refreshToken, accessToken});

    }catch(err){
        console.log(err);
    }
    
    return res.status(500).json({error: 'System error'});
}

export async function get(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            const admin = await Admin.findOne({_id: id});
            
            if(admin) return res.json({admin});

            return res.status(404).json({err: 'Admin not found'});
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'});
        }
    }

    res.status(400).json({err: 'Id not sent'});
}

export async function create(req: Request, res: Response){
    const newAdminFields = await createAdminFilter(req.body);

    if('err' in newAdminFields) return res.status(400).json({err: newAdminFields.err});

    try{
        const admin = await Admin.create(newAdminFields);

        if(!admin) throw Error('Admin not created. Err: ' + admin);

        const refreshToken = jwt.sign({adminId: admin.id}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '7d'});
        const accessToken =  jwt.sign(
            {adminId: admin.id, name: admin.name, profile_pic: admin.profile_pic},
            process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'}
        );

        const sevenDaysDate = new Date(Date.now() + 604800000);

        const hasRToken = await RefreshToken.findOneAndUpdate(
            {admin_id: admin.id}, {expiresin: sevenDaysDate, refresh_token: refreshToken}
        );
            
        if(!hasRToken)
            await RefreshToken.create({admin_id: admin.id, expiresin: sevenDaysDate, refresh_token: refreshToken});

        return res.status(201).json({refreshToken, accessToken});

    }catch(err){
        console.log(err);
    }
    
    res.status(500).json({err: 'System error'});
}

export async function update(req: Request, res: Response){
    const id = req.params.id;
    
    if(!id) return res.status(400).json({err: 'Id not sent'});
    
    const admin = await Admin.findOne({_id: id});
    
    if(!admin) return res.status(404).json({err: 'Admin not found'});
    
    const updateFields = await updateAdminFilter(req.body, admin);

    if('err' in updateFields) return res.status(400).json({err: updateFields.err});

    if(Object.keys(updateFields).length > 0){

        try{
            const updatedAdmin = await Admin.findOneAndUpdate({_id: id}, updateFields, {new: true});
            
            return res.json({admin: updatedAdmin});
            
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'});
        }
    }

    res.json({err: 'Admin not updated'});
}

export async function newProfilePic(req: Request, res: Response){
    const id = req.params.id;
    const newPic = req.file;

    if(!id) return res.status(400).json({err: 'Id not sent'});

    const admin = await Admin.findOne({_id: id});

    if(!admin) return res.status(404).json({err: 'Admin not found'});

    if(!newPic) return res.status(400).json({err: 'Profile pic wasn\'t sent'});

    try{
        await sharp(__dirname + '/../../public/media/images/temp/' + newPic.filename)
            .resize(100, 100)
            .toFile(__dirname + '/../../public/media/images/' + newPic.filename);
    
        sharp.cache(false);

        fs.unlinkSync(__dirname + '/../../public/media/images/temp/' + newPic.filename);

        if(
            admin.profile_pic != 'default_profile_pic.jpg' && 
            fs.existsSync(__dirname + '/../../public/media/images/' + admin.profile_pic)
        ){
            fs.unlinkSync(__dirname + '/../../public/media/images/' + admin.profile_pic);
        }

        const newAdmin = await Admin.findOneAndUpdate({_id: id}, {profile_pic: newPic.filename}, {new: true});
    
        return res.json({admin: newAdmin});
        
    }catch(err){
        console.log(err);
    }

    res.status(500).json({err: 'System error'});
}

export async function removeProfilePic(req: Request, res: Response){
    const id = req.params.id;

    if(!id) res.status(400).json({err: 'Id not sent'});

    const admin = await Admin.findOne({_id: id});
    
    if(!admin) res.status(404).json({err: 'Admin not found'});

    try{
        const admin = await Admin.findOneAndUpdate({_id: id}, {profile_pic: 'default_profile_pic.jpg'}, {new: true});

        return res.json({admin});
        
    }catch(err){
        console.log(err);
    }
    
    res.status(500).json({err: 'System error'});
}

export async function del(req: Request, res: Response){
    const id = req.params.id;
    const password = req.body.password;

    if(!id) return res.status(400).json({err: 'Invalid id'});

    if(!password) return res.status(400).json({err: 'Invalid password'});

    try{
        const admin = await Admin.findOne({_id: id});

        if(!admin) return res.json({err: 'Amdin not found'});

        if(!bcrypt.compareSync(password, admin.password)) return res.json({err: 'Wrong password'});

        if(admin.profile_pic != 'default_profile_pic.jpg' && fs.existsSync(__dirname + '/../../public/media/images/' + admin.profile_pic))
            fs.unlinkSync(__dirname + '/../../public/media/images/' + admin.profile_pic);

        await Admin.deleteOne({_id: id});

        return res.json({success: 'Admin deleted'});

    }catch(err){
        console.log(err);
    }
    
    res.status(500).json({err: 'System error'})
}