import MongoConnect from "./database/mongo";
import app from "./app";

const server = app;

server.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.BASE_URL}`)
});

MongoConnect();