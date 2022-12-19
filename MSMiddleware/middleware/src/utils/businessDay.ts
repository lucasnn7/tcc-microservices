export const businessDay = (month: number, year: number) => {
    const days = new Date(`January 01, ${year} 00:00:00`);
    days.setMonth(month-1);
    const currentMonth = days.getMonth();
    let sumDays = 0;
    do {
        if(days.getDay() >= 1 && days.getDay() <= 5) sumDays++
        days.setDate(days.getDate()+1);
    } while(days.getMonth() === currentMonth);
    return sumDays;
}