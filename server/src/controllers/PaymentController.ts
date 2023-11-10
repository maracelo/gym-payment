import { Request, Response } from "express";
import User from "../models/User";

export async function updatePaymentStatus(req: Request, res: Response){
    const id = req.params.id;
    const paymentSatus = req.body.payment_status;

    if(typeof(paymentSatus) !== 'boolean') return res.status(400).json({err: 'paymentStatus must be boolean'});

    try{
        const user = await User.findOneAndUpdate({_id: id}, {payment_status: paymentSatus});
        if(user) return res.json({err: 'payment status updated'});
    }catch(err){
        console.log(err);
        return res.json({err: 'system error'});
    }

    return res.status(400).json({err: 'user not found'});
}