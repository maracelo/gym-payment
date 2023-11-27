import validator from "validator";
import bcrypt from "bcrypt";

import Admin from "../models/Admin";

import phoneValidator from "./phoneValidator";
import passwordValidator from "./passwordValidator";

type createFields = {
    name: string,
    email: string,
    phone: string | null,
    password: string,
    profile_pic?: string
};

type filterReturn = Promise<createFields | {err: string}>;

async function filterAdminDataCreate(data: any): filterReturn{
    const { name, email, phone, password, password_confirmation } = data;

    if(!name || name.length < 2) return {err: 'Invalid name'};

    if(!email || !validator.isEmail(email)) return {err: 'Invalid email'};

    if(await Admin.findOne({email})) return {err: 'Email already exists'};

    if(!password || password !== password_confirmation || !passwordValidator(password)) 
        return {err: 'Password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'};

    let filteredPhone = null;

    if(phone){
        filteredPhone = phoneValidator(phone ?? '');
        if(!filteredPhone) return {err: 'Invalid phone number'};
    }

    return {name, email, phone: filteredPhone ?? null, password: bcrypt.hashSync(password, 10)};
}

export default filterAdminDataCreate;