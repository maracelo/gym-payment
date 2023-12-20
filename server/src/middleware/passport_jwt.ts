import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

import Admin from "../models/Admin";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new Strategy(opts, async (jwt_payload, done) =>{
  try{
    const user = await Admin.findOne({_id: jwt_payload.id});
    
    console.log('user: ' + user);
    console.log('id: ' + jwt_payload.id);
    
    if(user) return done(null, user);
    
    return done(null, false);

  }catch(err){
    return done(err, false);
  }
}));