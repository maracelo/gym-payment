import validator from "validator";

import User, { UserType } from "../../models/User";

import phoneValidator from "../phoneValidator";

type updateFields = {
    name?: string,
    email?: string,
    plan?: string,
    phone?: string,
    profile_pic?: string
};

type filterReturn = Promise<updateFields | {err: string}>;

async function updateUserFilter(data: any, user: UserType): filterReturn{
    const { name, email, plan, phone, profile_pic } = data;
    let updateFields: updateFields = {};

    if(name){
        if(name === user.name || name.length < 2) return {err: 'Invalid name'};
        updateFields.name = name;
    }

    if(email){
        if(!validator.isEmail(email)) return {err: 'Invalid email'};
        
        else if(await User.findOne({email})) return {err: 'Email already exists'};
        
        updateFields.email = email;
    }

    if(plan){
        if(plan != 'true' && plan != 'false') return {err: 'Invalid plan'};
        if(plan !== user.plan) updateFields.plan = plan;
    }

    if(phone){
        const filteredPhone = phoneValidator(phone);

        if(!filteredPhone || filteredPhone == user.phone) return {err: 'Invalid phone number'};
        updateFields.phone = filteredPhone;
    }

    return updateFields;
}

export default updateUserFilter;