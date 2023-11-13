import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";

import Admin from '../models/Admin';

import phoneValidator from "../helpers/phoneValidator";
import generateToken from "../helpers/generateToken";
import passwordValidator from "../helpers/passwordValidator";

export async function login(req: Request, res: Response){
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({err: 'field lefting'});

    if(!validator.isEmail(email)) return res.status(400).json({err: 'invalid email or password'});
    
    const admin = await Admin.findOne({email});

    if(!admin || !password && bcrypt.compareSync(password, admin.password))
        return res.status(400).json({err: 'invalid email or password'});

    const token = generateToken(admin.id);

    res.json({token});
}

export async function get(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            const admin = await Admin.findOne({_id: id});
            if(admin) return res.json(admin);
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'system error'});
        }
    }

    res.json({err: 'admin not found'});
}

export async function create(req: Request, res: Response){
    const { 
        name,
        email,
        phone,
        password,
        password_confirmation,
        profile_pic,
    } = req.body;

    if(!name || name.length < 2) return res.status(400).json({err: 'invalid name'});

    if(!email && !validator.isEmail(email)) return res.status(400).json({err: 'invalid email'});

    let filteredPhone = null;

    if(phone){
        filteredPhone = phoneValidator(phone);

        if(!filteredPhone) return res.status(400).json({err: 'invalid phone number'});
    }

    if(!password || !passwordValidator(password) || password !== password_confirmation){
        return res.status(400)
            .json({err: 'password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'});
    }

    const hash = bcrypt.hashSync(password, 10);

    try{
        const admin = await Admin.create({
            name,
            email,
            phone: filteredPhone ?? null,
            password: hash,
        });
        if(admin){
            const token = generateToken({id: admin.id});
            return res.status(201).json({token});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({err: 'system error'});
    }

    res.json({err: 'admin not created'});
}

type updateFields = { name?: string, email?: string, phone?: string, password?: string }

export async function update(req: Request, res: Response){
    const id = req.params.id;
    
    if(!id) return res.status(400).json({err: 'id not sent'});
    
    const admin = await Admin.findOne({_id: id});
    
    if(!admin) return res.status(400).json({err: 'admin doesn\'t exist'});
    
    const {name, phone, new_password, current_password} = req.body;
    let updateFields: updateFields = {};

    if(name){
        if(name.length < 2) return res.status(400).json({err: 'invalid name'}); // TODO a change email option
        updateFields.name = name;
    } 

    if(phone){
        const filteredPhone = phoneValidator(phone);
        if(filteredPhone) updateFields.phone = filteredPhone;
    }

    if(new_password && current_password){
        if(
            !passwordValidator(new_password) || !passwordValidator(current_password) 
            || new_password !== current_password 
            || !bcrypt.compareSync(current_password, admin.password)
        ){
            return res.status(400)
                .json({err: 'password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'});
        }
        updateFields.password = bcrypt.hashSync(new_password, 10);
    }

    if(updateFields){
        try{
            const updatedAdmin = await Admin.findOneAndUpdate({_id: id}, updateFields, {new: true});
            if(updatedAdmin) return res.json(updatedAdmin);
        }catch(err){
            console.log(err);
            res.status(500).json({err: 'system error'});
        }
    }

    res.json({err: 'admin not Updated'});
}

export async function del(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            const admin = await Admin.findOneAndDelete({_id: id});
            if(admin) return res.json({success: 'admin deleted'});
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'system error'})
        }
    }

    res.json({err: 'user not deleted'});
}