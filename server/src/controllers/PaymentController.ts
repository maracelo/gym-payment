import { Request, Response } from "express";
import User from "../models/User";

export async function updatePaymentStatus(req: Request, res: Response){
    const id = req.params.id;

    try{
        const user = await User.findOne({_id: id});

        if(user){
            let payment_status;
            let payment_late_date;

            if(user.payment_status === 'late'){
                payment_status = 'payed';
                payment_late_date = null;
            }else{
                payment_status = 'late';
                payment_late_date = new Date();
            }

            const update = await User.findOneAndUpdate( {_id: id}, {
                payment_status: payment_status,
                payment_late_date: payment_late_date
            });
    
            if(update) return res.json({success: 'payment status updated'});
        }
    }catch(err){
        console.log(err);
        return res.json({err: 'system error'});
    }

    return res.status(400).json({err: 'user not found'});
}