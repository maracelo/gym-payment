import { Request, Response } from "express";
import bcrypt from "bcrypt";
import sharp from "sharp";
import fs from "fs";

import User from "../models/User";

import updateUserFilter from "../helpers/user/updateUserFilter";
import createUserFilter from "../helpers/user/createUserFilter";
import getTodayDay from "../helpers/getTodayDay";

export async function getTodayList(req: Request, res: Response){
    try{
        const todayUsers = await User.aggregate([{
            $match: {$expr: {$eq: [{$dayOfMonth: '$createdAt'}, getTodayDay()]} }
        }]);
        return res.json({todayUsers});
    }catch(err){
        console.log(err);
    }

    res.status(500).json({err: {err: 'System error'}});
}

export async function getLateList(req: Request, res: Response){
    try{
        const lateUsers = await User.find({payment_status: 'late'});
        return res.json({lateUsers});
    }catch(err){
        console.log(err);
    }

    res.status(500).json({err: 'System error'})
}

export async function get(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            let user = await User.findOne({_id: id});

            if(user) return res.json({user});
            
            return res.status(404).json({err: 'User not found'});
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'})
        }
    }

    res.status(400).json({err: 'Id not sent'});
}

export async function create(req: Request, res: Response){
    const newUserFields = await createUserFilter(req.body);

    if('err' in newUserFields) return res.status(400).json({err: newUserFields.err}); 

    try{
        const user = await User.create(newUserFields);

        if(user) return res.status(201).json({user});
        
        return res.status(500).json({err: 'User not created'});
    }catch(err){
        console.log(err);
    }

    res.status(500).json({err: 'System error'});
}

export async function update(req: Request, res: Response){
    const id = req.params.id;

    if(!id) return res.status(400).json({err: 'Id not sent'});

    const user = await User.findOne({_id: id});

    if(!user) return res.status(404).json({err: 'User not found'});

    const updateFields = await updateUserFilter(req.body, user);

    if('err' in updateFields) return res.status(400).json({err: updateFields.err});
    
    if(Object.keys(updateFields).length > 0){
        try{
            const updatedUser = await User.findOneAndUpdate({_id: id}, updateFields, {new: true});

            return res.json({user: updatedUser});
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'});
        }
    }

    res.json({err: 'User not updated'});
}

export async function newProfilePic(req: Request, res: Response){
    const id = req.params.id;
    const newPic = req.file;

    if(!id) return res.status(400).json({err: 'Id not sent'});

    const user = await User.findOne({_id: id});

    if(!user) return res.status(404).json({err: 'User not found'});

    if(!newPic) return res.status(400).json({err: 'Profile pic wasn\'t sent'});

    try{
        await sharp(__dirname + '/../../public/media/images/temp/' + newPic.filename)
            .resize(100, 100)
            .toFile(__dirname + '/../../public/media/images/' + newPic.filename);
    
        sharp.cache(false);

        fs.unlinkSync(__dirname + '/../../public/media/images/temp/' + newPic.filename);

        if(
            user.profile_pic != 'default_profile_pic.jpg' &&
            fs.existsSync(__dirname + '/../../public/media/images/' + user.profile_pic)
        ){
            fs.unlinkSync(__dirname + '/../../public/media/images/' + user.profile_pic);
        }

        const newUser = await User.findOneAndUpdate({_id: id}, {profile_pic: newPic.filename}, {new: true});
    
        return res.json({user: newUser});
        
    }catch(err){
        console.log(err);
    }

    res.status(500).json({err: 'System error'});
}

export async function removeProfilePic(req: Request, res: Response){
    const id = req.params.id;

    if(!id) res.status(400).json({err: 'Id not sent'});

    const user = await User.findOne({_id: id});
    
    if(!user) res.status(404).json({err: 'User not found'});

    try{
        const user = await User.findOneAndUpdate({_id: id}, {profile_pic: 'default_profile_pic.jpg'}, {new: true});
        return res.json({user});
    }catch(err){
        console.log(err);
    }
    
    res.status(500).json({err: 'System error'});
}

export async function del(req: Request, res: Response){
    const id = req.params.id;
    const adminPassword = (req.user as any).password ?? '';
    const passwordSent = req.body.password;

    if(!id) return res.status(400).json({err: 'Invalid id'});

    if(!passwordSent || !bcrypt.compareSync(passwordSent, adminPassword))
        return res.status(400).json({err: 'Invalid password'});

    try{
        const user = await User.findOne({_id: id});

        if(!user) return res.status(404).json({err: 'User not found'});

        if(user.profile_pic != 'default_profile_pic.jpg' && fs.existsSync(__dirname + '/../../public/media/images/' + user.profile_pic))
            fs.unlinkSync(__dirname + '/../../public/media/images/' + user.profile_pic);
        
        await User.deleteOne({_id: id});

        return res.json({success: 'User deleted'});
        
    }catch(err){
        console.log(err);
    }

    res.status(500).json({err: 'System error'});
}