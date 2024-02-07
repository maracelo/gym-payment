function getTodayMonthDay(){
    const date = new Date();
    return `${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
}

function addZero(date: number){
    if(date < 10) return '0' + date;
    return date;
}

export default getTodayMonthDay;