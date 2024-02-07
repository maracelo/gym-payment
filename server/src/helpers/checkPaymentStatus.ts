import User from "../models/User";
import getTodayMonthDay from "./getTodayMonthDay";

async function checkPaymentStatus(){
    const date = new Date();

    const currHour = date.getHours();

    let difference = 0;

    if(currHour != 0) difference = 24 - currHour;
    
    setTimeout(async () =>{
        await User.updateMany({payment_status: 'late'}).where('createdAt').equals(getTodayMonthDay());

        setInterval(async () =>{
            await User.updateMany({payment_status: 'late'}).where('createdAt').equals(getTodayMonthDay());
        }, 86400000);

    }, difference * 3600000);
}

export default checkPaymentStatus;