import { MongoConnect } from "./database/mongo";
import app from "./app";
import checkPaymentStatus from "./helpers/checkPaymentStatus";

const server = app;

MongoConnect();

checkPaymentStatus();

try{
    server.listen(process.env.PORT, () => {
        console.log(`Running on ${process.env.BASE_URL}`)
    });
}catch(err){
    console.log('Error has occured: ' + err);
}