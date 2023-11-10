import { Schema, Model, model, connection } from "mongoose";

type AdminType = {
    name: string,
    email: string,
    phone: string|null,
    password: string,
    profile_pic: string,
}

const UserSchema = new Schema<AdminType>({
    name: {type: String, required: true},
    email: {type: String, require: true},
    phone: {type: String, default: null},
    password: {type: String, required: true},
    profile_pic: {type: String, default: 'default_profile_pic.jpg'},
}, {
    timestamps: true,
    versionKey: false
});

const modelName = 'Admin';

export default connection && connection.models[modelName] ?
    connection.models[modelName] as Model<AdminType>
    :
    model<AdminType>(modelName, UserSchema);