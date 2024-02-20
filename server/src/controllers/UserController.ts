import { Request, Response } from "express";

import User from "../models/User";

import updateUserFilter from "../helpers/user/updateUserFilter";
import createUserFilter from "../helpers/user/createUserFilter";
import getTodayDay from "../helpers/getTodayDay";

export async function getTodayList(req: Request, res: Response){
    try{
        const todayUsers = await User.find({payment_day: getTodayDay()});
        return res.json({todayUsers});
    }catch(err){
        console.log(err);
        res.status(500).json({err: {err: 'System error'}})
    }
}

export async function getLateList(req: Request, res: Response){
    try{
        const lateUsers = await User.find({payment_status: 'late'});
        return res.json({lateUsers});
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'System error'})
    }
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
            res.status(500).json({err: 'System error'})
        }
    }
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
        res.status(500).json({err: 'System error'});
    }
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

            if(updatedUser) return res.json({updatedUser});
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'});
        }
    }

    return res.json({err: 'User not updated'});
}

export async function del(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            const user = await User.findOneAndDelete({_id: id});

            if(user) return res.json({success: 'User deleted'});
            
            return res.status(404).json({err: 'User not found'});
        }catch(err){
            console.log(err);
            res.status(500).json({err: 'System error'});
        }
    }
    
}