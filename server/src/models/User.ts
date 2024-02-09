import { Schema, Model, model, connection } from "mongoose";
import getTodayDay from "../helpers/getTodayDay";

export type UserType = {
    name: string,
    email: string,
    phone: string|null,
    plan: 'normal'|'vip',
    profile_pic: string,
    payment_status: 'late'|'payed',
    payment_day: number,
    createdAt: Date
}

const UserSchema = new Schema<UserType>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, default: null},
    plan: {type: String, enum: ['normal', 'vip'], default: 'normal', required: true},
    profile_pic: {type: String, default: 'default_profile_pic.jpg'},
    payment_status: {type: String, enum: ['late', 'payed'], default: 'payed'},
    payment_day: {type: Number, default: getTodayDay()},
    createdAt: {type: Date, default: new Date()}
}, {
    timestamps: false,
    versionKey: false
});

const modelName = 'User';

export default connection && connection.models[modelName] ?
    connection.models[modelName] as Model<UserType>
    :
    model<UserType>(modelName, UserSchema);