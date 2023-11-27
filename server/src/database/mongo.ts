import mongoose, { connect, disconnect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function MongoConnect(){
    try{
        console.log('Connecting to Mongo...');
        
        let mongoUrl = '';

        switch(process.env.NODE_ENV as string){
            case 'production':
                mongoUrl = process.env.MONGO_URL as string;
            break;
            case 'development':
                mongoUrl = process.env.MONGO_DEV_URL as string;
            break;
            case 'test':
                mongoUrl = process.env.MONGO_TEST_URL as string;
        }

        await connect(mongoUrl);

        console.log('Connected to Mongo');
    }catch(err){
        console.log(`Failed to connect: ${err}`)
    }
}

export async function MongoClear(){
    try{
        const collections = mongoose.connection.collections;

        for(let i in collections){ await collections[i].deleteMany({}) }
    }catch(err){
        console.log(`Failed to clear: ${err}`);
    }
}

export async function MongoDisconnect(){
    try{
        console.log('Disconnecting to Mongo...');

        await disconnect();

        console.log('Disconnected to Mongo');
    }catch(err){
        console.log(`Failed to disconnect: ${err}`)
    }
}