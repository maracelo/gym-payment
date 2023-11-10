import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateToken(data: Object){
    const token = jwt.sign(data, process.env.JWT_SECRET as string);
    return token;
}

export default generateToken;