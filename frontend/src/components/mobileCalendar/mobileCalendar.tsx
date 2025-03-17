import './mobileCalendar.css';
import MobileCalendarDay from './mobileCalendarDay';
import { daysBetween } from '../../helpers/daysBetween';
import { useEffect, useState } from 'react';
import { useGetMonthTideTimes } from '../../api/getTideTimes';
import { useCalendarContext } from '../../context/calendarContext';
import Card from '../card/card';
import ChevronButton from '../chevronButton/chevronButton';


const MobileCalendar = () => {
    const { month, year, day, setDay, setMonth } = useCalendarContext();
    const today = new Date();
    const { mutate: getMonthTideTimes, data, isPending } = useGetMonthTideTimes();
    const [monthLabel, setMonthLabel] = useState(Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(month.toString())));
    const [firstDay, setFirstDay] = useState(new Date(year, month - 1, 1));
    const [lastDay, setLastDay] = useState(new Date(year, month, 0));
    const [startDay, setStartDay] = useState(firstDay.getDay() + 1);
    const [monthLength, setMonthLength] = useState(daysBetween(firstDay, lastDay) + 1);
    let offSeason = false;
    useEffect(() => {
        setMonthLabel(Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(month.toString())));
        const firstDayLocal = new Date(year, month - 1, 1);
        setFirstDay(firstDayLocal);
        const lastDayLocal = new Date(year, month, 0);
        setLastDay(lastDayLocal);
        setStartDay(firstDayLocal.getDay() + 1);
        setMonthLength(daysBetween(firstDayLocal, lastDayLocal) + 1);
        getMonthTideTimes();
    }, [month])
    useEffect(() => {
        const currDay = new Date(year, month-1, day)
        console.log(currDay.getMonth())
        if (currDay.getMonth() + 1 !== month) {
            setMonth(currDay.getMonth() + 1)
            setDay(currDay.getDate())
        }
    }, [day])
    if (data == "It's Off Season") {
        offSeason = true;
    }
    const dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + (day) : day);
    return (
        <Card calendarCard isMobile>
            <div className='calendar-container'>
                <h2 className='mobile-month'>{monthLabel} - {day}</h2>
                <MobileCalendarDay
                    date={day}
                    startDay={startDay}
                    today={today}
                    dayData={data && data.tides[day-1]}
                    weatherData={data && data.weather[dateStr]}
                    isPending={isPending}
                />
            </div>
            <div className='calendar-buttons'>
                <ChevronButton direction="left" clickFunction={() => { setDay(day - 1) }} borderRadiusSide='all' />
                <ChevronButton direction="right" clickFunction={() => { setDay(day + 1) }} borderRadiusSide='all' />
            </div>
        </Card>
    )
}

export default MobileCalendar