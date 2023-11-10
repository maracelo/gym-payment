import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function MongoConnect(){
    try{
        console.log('Connecting to Mongo...');
        await connect(process.env.MONGO_URL as string);
        console.log('Connected to Mongo');
    }catch(err){
        console.log(`Failed to connect: ${err}`)
    }
}

export default MongoConnect;