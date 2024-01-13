import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";

import Admin from '../models/Admin';

import generateToken from "../helpers/generateToken";
import filterAdminDataUpdate from "../helpers/filterAdminDataUpdate";
import filterAdminDataCreate from "../helpers/filterAdminDataCreate";

export async function login(req: Request, res: Response){
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({err: 'Field lefting'});

    if(!validator.isEmail(email)) return res.status(400).json({err: 'Invalid email or password'});
    
    const admin = await Admin.findOne({email});

    if(!admin || !password && bcrypt.compareSync(password, admin.password))
        return res.status(400).json({err: 'Invalid email or password'});

    const token = generateToken({id: admin.id});

    res.json({token});
}

export async function get(req: Request, res: Response){
    const id = req.params.id;

    if(id){
        try{
            const admin = await Admin.findOne({_id: id});
            
            if(admin) return res.json(admin);

            return res.status(404).json({err: 'Admin not found'});
        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'});
        }
    }
}

export async function create(req: Request, res: Response){
   const newAdminFields = await filterAdminDataCreate(req.body);

   if('err' in newAdminFields) return res.status(400).json({err: newAdminFields.err});

    try{
        const admin = await Admin.create(newAdminFields);

        if(admin){
            const token = generateToken({id: admin.id});
            return res.status(201).json({token});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({err: 'System error'});
    }

    res.json({err: 'Admin not created'});
}

type updateFields = {
    name?: string,
    email?: string,
    phone?: string,
    password?: string
};

export async function update(req: Request, res: Response){
    const id = req.params.id;
    
    if(!id) return res.status(400).json({err: 'Id not sent'});
    
    const admin = await Admin.findOne({_id: id});
    
    if(!admin) return res.status(404).json({err: 'Admin not found'});
    
    const updateFields = await filterAdminDataUpdate(req.body, admin);

    if('err' in updateFields) return res.status(400).json({err: updateFields.err});

    if(Object.keys(updateFields).length > 0){

        try{
            const updatedAdmin = await Admin.findOneAndUpdate({_id: id}, updateFields, {new: true});
            if(updatedAdmin) return res.json(updatedAdmin);
        }catch(err){
            console.log(err);
            res.status(500).json({err: 'System error'});
        }
    }

    res.json({err: 'Admin not updated'});
}

export async function del(req: Request, res: Response){
    const id = req.params.id;
    const password = req.body.password;

    if(id && password){
        try{
            const admin = await Admin.findOne({_id: id});

            if(!admin) return res.json({err: 'Amdin not found'});

            if(bcrypt.compareSync(password, admin.password)) {err: 'Wrong password'};

            await Admin.findOneAndDelete({_id: id});
            return res.json({success: 'Admin deleted'});

        }catch(err){
            console.log(err);
            return res.status(500).json({err: 'System error'})
        }
    }

    res.status(400).json({err: 'Password or id not send'});
}