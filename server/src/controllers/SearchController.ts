import { Request, Response } from "express";
import User from "../models/User";

export async function search(req: Request, res: Response){
  const name = req.query.name ?? null;

  if(name){
  const users = await User.find({name: new RegExp('.*' + name + '.*')});

    if(users && users.length > 0) return res.status(200).json({users});

    return res.status(404).json({err: 'Nothing found'});
  }

  res.status(400).json({err: 'Name is empty'});
}