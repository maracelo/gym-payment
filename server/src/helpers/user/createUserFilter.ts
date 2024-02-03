import validator from "validator";

import User from "../../models/User";

import planValidator from "./planValidator";
import phoneValidator from "../phoneValidator";

type createFields = {
    name: string,
    email: string,
    plan: string,
    phone: string | null,
    profile_pic?: string
};

type filterReturn = Promise<createFields | {err: string}>;

async function createUserFilter(data: any): filterReturn{
    const { name, email, plan, phone } = data;

    if(!name || name.length < 2) return {err: 'Invalid name'};

    if(!email || !validator.isEmail(email)) return {err: 'Invalid email'};

    if(await User.findOne({email})) return {err: 'Email already exists'};

    if(!plan || !planValidator(plan)) return {err: 'Invalid plan'};

    let filteredPhone = null;

    if(phone){
        filteredPhone = phoneValidator(phone ?? '');
        if(!filteredPhone) return {err: 'Invalid phone number'};
    }

    return {name, email, plan, phone: filteredPhone ?? null};
}

export default createUserFilter;