import './calendar.css';
import CalendarDay from './calendarDay';
import CalendarLabel from './calendarLabel';
import { daysBetween } from '../../helpers/daysBetween';
import { useEffect } from 'react';
import { useGetMonthTideTimes } from '../../api/getTideTimes';
import { useCalendarContext } from '../../context/calendarContext';
import Modal from '../modal/modal';


const Calendar = () => {
    const { month, year, modalOpen } = useCalendarContext();
    const today = new Date();
    const { mutate: getMonthTideTimes, tideTimes, isPending } = useGetMonthTideTimes();
    useEffect(() => {
        getMonthTideTimes();
    }, [getMonthTideTimes])
    const monthLabel = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(month.toString()));
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDay = firstDay.getDay() + 1;
    const monthLength = daysBetween(firstDay, lastDay) + 1;
    const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //TODO some sort of load state with isPending
    //console.log(isPending)
    return (
        <div>
            <h2 className='calendar-month'>{monthLabel}</h2>
            <div className="calendar-wrapper">
                <div className='calendar-list'>
                    {dayList.map((day, i) => {
                        return <CalendarLabel day={day} key={i} />
                    })}
                    {Array.from({ length: monthLength }, (_, i) => {
                        return (
                            <CalendarDay
                                key={i}
                                date={i + 1}
                                startDay={startDay}
                                today={today.getDate()}
                                dayData={tideTimes && tideTimes.tides[i]}
                            />)
                    })}
                </div>
            </div>
            <Modal />
        </div>
    )
}

export default Calendar