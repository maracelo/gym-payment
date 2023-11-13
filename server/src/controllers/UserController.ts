import { Request, Response } from "express";
import validator from "validator";

import User from "../models/User";

import phoneValidator from "../helpers/phoneValidator";
import planValidator from "../helpers/planValidator";

export async function getAll(req: Request, res: Response){
    try{
        const users = await User.find() ?? {users: []};
        res.json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'System error'});
    }
}

export async function get(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            let user = await User.findOne({_id: id});
            if(user) return res.json(user);
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'})
        }
    }
    
    res.json({err: 'User doesn\'t exist'});
}

export async function create(req: Request, res: Response){
    const { name, email, plan, phone } = req.body;

    if(!name || name.length < 2) return res.status(400).json({err: 'invalid name'});

    if(!email || !validator.isEmail(email)) return res.status(400).json({err: 'invalid email'});

    if(!plan && !planValidator(plan)) return res.status(400).json({err: 'invalid plan'});

    let filteredPhone = null;

    if(phone){
        filteredPhone = phoneValidator(phone ?? '');

        if(!filteredPhone) return res.status(400).json({err: 'invalid phone'});
    }

    try{
        const user = await User.create({ name, email, plan, phone: filteredPhone ?? null });
        if(user) res.status(201).json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json('system error');
    }

    return res.status(500).json({err: 'user not created'});
}

type updateFields = {
    name?: string,
    plan?: string,
    phone?: string,
    profile_pic?: string
}

export async function update(req: Request, res: Response){
    const id = req.params.id;

    if(!id) return res.status(400).json({err: 'id not sent'});

    const user = await User.findOne({_id: id});

    if(!user) return res.status(400).json({err: 'user not found'});

    const { name, plan, phone } = req.body; // TODO a change email option
    let updateFields: updateFields = {};

    if(name && name !== user.name && name.length > 2) updateFields.name = name;

    if(plan && plan !== user.plan && planValidator(plan)) updateFields.plan = plan;

    if(phone){
        const filteredPhone = phoneValidator(phone);

        if(filteredPhone && filteredPhone != user.phone)
            updateFields.phone = filteredPhone;
    }

    // TODO make profile_pic filter mime type

    if(Object.keys(updateFields).length > 0){
        try{
            const updatedUser = await User.findOneAndUpdate({_id: id}, updateFields, {new: true});
            if(updatedUser) return res.json(updatedUser);
        }catch(err){
            console.log(err);
            return res.status(500).json('System error');
        }
    }

    res.json({err: 'User not updated'});
}

export async function del(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            const user = await User.findOneAndDelete({_id: id});
            if(user) return res.json({success: 'user deleted'});
        }catch(err){
            console.log(err);
            return res.status(500).json('system error');
        }
    }
    
    res.json({err: 'user doesn\'t exist'});
}