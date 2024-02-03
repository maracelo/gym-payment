import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function checkToken(token: string): 'invalid'|'expired'|object{
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    if(!decoded) return 'invalid';

    if(Date.now() >= decoded.exp * 1000) return 'expired';

    return decoded;
}

export default checkToken;