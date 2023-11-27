import validator from "validator";
import bcrypt from "bcrypt";

import Admin, { AdminType } from "../models/Admin";

import passwordValidator from "../helpers/passwordValidator";
import phoneValidator from "./phoneValidator";

type updateFields = {
    name?: string,
    email?: string,
    plan?: string,
    phone?: string,
    password?: string;
    profile_pic?: string
};

type filterReturn = Promise<updateFields | {err: string}>;

async function filterAdminDataUpdate(data: any, admin: AdminType): filterReturn{
    const {name, email, phone, new_password, current_password} = data;
    let updateFields: updateFields = {};

    if(name){
        if(name === admin.name || name.length < 2) return {err: 'Invalid name'};
        updateFields.name = name;
    }

    if(email){
        if(!validator.isEmail(email)) return {err: 'Invalid email'};
        
        if(await Admin.findOne({email})) return {err: 'Email already exists'};
        
        updateFields.email = email;
    }

    if(new_password && current_password){
        if(
            !passwordValidator(new_password) || !passwordValidator(current_password) 
            || new_password === current_password 
            || !bcrypt.compareSync(current_password, admin.password)
        ){
            return {err: 'Password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'};
        }
        updateFields.password = bcrypt.hashSync(new_password, 10);
    }

    if(phone){
        const filteredPhone = phoneValidator(phone);

        if(!filteredPhone || filteredPhone == admin.phone) return {err: 'Invalid phone number'};
        updateFields.phone = filteredPhone;
    }

    // TODO make a filter to profile_pic

    return updateFields;
}

export default filterAdminDataUpdate;