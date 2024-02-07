import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

import Admin from "../models/Admin";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(new Strategy(opts, async (jwt_payload, done) =>{
  try{
    const admin = await Admin.findOne({_id: jwt_payload.adminId});

    if(admin) return done(null, admin, admin._id);
    
    return done(null, false);

  }catch(err){
    return done(err, false);
  }
}));