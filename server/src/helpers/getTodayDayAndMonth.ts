function getTodayDayAndMonth(): {day: number, month: number}{
    const date = new Date();
    const convertedDate = date.toISOString();
    const day = parseInt(convertedDate.slice(8, 10));
    const month = parseInt(convertedDate.slice(5, 7));

    return {day, month};
}

export default getTodayDayAndMonth;