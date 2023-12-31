import { Schema, Model, model, connection } from "mongoose";

export type UserType = {
    name: string,
    email: string,
    phone: string|null,
    plan: 'normal'|'vip',
    profile_pic: string,
    payment_status: 'not payed'|'payed',
}

const UserSchema = new Schema<UserType>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, default: null},
    plan: {type: String, enum: ['normal', 'vip'], default: 'normal', required: true},
    profile_pic: {type: String, default: 'default_profile_pic.jpg'},
    payment_status: {type: String, enum: ['not payed', 'payed'], default: 'payed'},
}, {
    timestamps: true,
    versionKey: false
});

const modelName = 'User';

export default connection && connection.models[modelName] ?
    connection.models[modelName] as Model<UserType>
    :
    model<UserType>(modelName, UserSchema);