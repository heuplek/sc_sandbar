import './calendar.css';
import CalendarDay from './calendarDay';
import CalendarLabel from './calendarLabel';
import { daysBetween } from '../../helpers/daysBetween';
import { useEffect } from 'react';
import { useGetMonthTideTimes } from '../../api/getTideTimes';
import { useCalendarContext } from '../../context/calendarContext';
import Modal from '../modal/modal';
import Card from '../card/card';


const Calendar = () => {
    const { month, year } = useCalendarContext();
    const today = new Date();
    const { mutate: getMonthTideTimes, data, isPending } = useGetMonthTideTimes();
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
    console.log(data?.weather)
    return (
        <Card calendarCard>
            <div className='calendar-container'>
                <div className='calendar-month'>
                    <h2>{monthLabel}</h2>
                    <h2>Battery Creek Sandbar</h2>
                </div>
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
                                    dayData={data && data.tides[i]}
                                />)
                        })}
                    </div>
                </div>
            </div>
            <Modal />
        </Card>
    )
}

export default Calendar