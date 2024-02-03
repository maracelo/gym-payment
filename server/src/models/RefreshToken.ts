import { Schema, Model, model, connection } from "mongoose";

type RTokenType = {
    admin_id: Schema.Types.ObjectId;
    expiresin: string;
    refresh_token: string;
} 

const RTokenSchema = new Schema<RTokenType>({
    admin_id: {type: Schema.Types.ObjectId, required: true, ref: 'Admin'},
    expiresin: {type: String, required: true},
    refresh_token: {type: String, required: true}
},{
    timestamps: false,
    versionKey: false
});

const modelName = "RefreshToken";

export default connection && connection.models[modelName] ? 
    connection.models[modelName] as Model<RTokenType> :
    model<RTokenType>(modelName, RTokenSchema);