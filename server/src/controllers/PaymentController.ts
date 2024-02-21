import { Request, Response } from "express";
import User from "../models/User";

export async function updatePaymentStatus(req: Request, res: Response){
    const id = req.params.id;

    try{
        const user = await User.findOne({_id: id});

        if(user){
            const update = await User.findOneAndUpdate(
                {_id: id}, {payment_status: user.payment_status === 'late' ? 'payed' : 'late'}
            );
    
            if(update) return res.json({success: 'payment status updated'});
        }
    }catch(err){
        console.log(err);
        return res.json({err: 'system error'});
    }

    return res.status(400).json({err: 'user not found'});
}