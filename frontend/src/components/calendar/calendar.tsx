import './calendar.css';
import CalendarDay from './calendarDay';
import CalendarLabel from './calendarLabel';
import { daysBetween } from '../../helpers/daysBetween';
import { useEffect, useState } from 'react';
import { useGetMonthTideTimes } from '../../api/getTideTimes';
import { useCalendarContext } from '../../context/calendarContext';
import Card from '../card/card';
import ChevronButton from '../chevronButton/chevronButton';


const Calendar = () => {
    const { month, year, setMonth } = useCalendarContext();
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
    const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (data == "It's Off Season") {
        offSeason = true;
    }
    return (
        <Card calendarCard>
            <div className='calendar-container'>
                <div className='calendar-month'>
                    <ChevronButton direction="left" clickFunction={() => { setMonth(month - 1) }} borderRadiusSide='all' />
                    <h2>{monthLabel}</h2>
                    <ChevronButton direction="right" clickFunction={() => { setMonth(month + 1) }} borderRadiusSide='all' />
                    <h2>{today.getFullYear()}</h2>
                </div>
                {offSeason && <h2>It's Off Season</h2>}
                {!offSeason &&
                <div className="calendar-wrapper">
                    <div className='calendar-list'>
                        {dayList.map((day, i) => {
                            return <CalendarLabel day={day} key={i} />
                        })}
                            {Array.from({ length: monthLength }, (_, i) => {
                            const dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (i + 1 < 10 ? '0' + (i + 1) : i + 1);
                            return (
                                <CalendarDay
                                    key={i}
                                    date={i + 1}
                                    startDay={startDay}
                                    today={today}
                                    dayData={data && data.tides[i]}
                                    weatherData={data && data.weather[dateStr]}
                                    isPending={isPending}
                                />)
                        })}
                    </div>
                </div>
                }
            </div>
        </Card>
    )
}

export default Calendar