import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin";
import RefreshToken from "../models/RefreshToken";

dotenv.config();

const opts = {
  fromHeader: ExtractJwt.fromHeader('RefreshToken'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  passReqToCallback: true
};

passport.use(new Strategy(opts, async (req: any, jwt_payload: any, done: any) =>{
  const refreshToken = req.headers['refresh-token'];
  let validRefreshT;
  
  try{
    validRefreshT = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    if(validRefreshT) validRefreshT = await RefreshToken.findOne({refresh_token: refreshToken});
  }catch(err){
    return done(err, false);
  }

  try{
    const admin = await Admin.findOne({_id: jwt_payload.adminId});

    if(admin && validRefreshT){

      const dbRefreshToken = await RefreshToken.findOne({admin_id: admin._id});

      if(dbRefreshToken) return done(null, admin, admin._id);
    }
    
    return done(null, false);

  }catch(err){
    return done(err, false);
  }
}));