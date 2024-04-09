import User from "../models/User";
import getTodayDayAndMonth from "./getTodayDayAndMonth";

async function checkPaymentStatus(){
    const date = new Date();

    const currHour = date.getHours();

    let difference = 0;

    if(currHour != 0) difference = 24 - currHour;
    
    setTimeout(async () =>{
        const {day} = getTodayDayAndMonth();

        await User.updateMany({payment_status: 'late'}, {payment_day: day});

        setInterval(async () =>{
            await User.updateMany({payment_status: 'late'}, {payment_day: day});
        }, 86400000);

    }, difference * 3600000);
}

export default checkPaymentStatus;