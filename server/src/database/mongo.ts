import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function MongoConnect(){
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

export default MongoConnect;