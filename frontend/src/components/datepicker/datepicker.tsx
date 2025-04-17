import { daysBetween } from '../../helpers/daysBetween';
import { useEffect, useState } from 'react';
import { useCalendarContext } from '../../context/calendarContext';
import Card from '../card/card';
import ChevronButton from '../chevronButton/chevronButton';
import './datepicker.css'
import { getMonthName } from '../../helpers/getMonthName';

type DatePickerProps = {
    setShowDatePicker: (show: boolean) => void;
}

//TODO this is really similar to the calendar component, maybe we can abstract this into a shared component
const DatePicker = ({ setShowDatePicker }: DatePickerProps) => {
    const { month, year, setDay, setMonth } = useCalendarContext();
    const today = new Date();
    const [dpMonth, setDpMonth] = useState(month);
    const [monthLabel, setMonthLabel] = useState(getMonthName(month));
    const [firstDay, setFirstDay] = useState(new Date(year, month - 1, 1));
    const [lastDay, setLastDay] = useState(new Date(year, month, 0));
    const [startDay, setStartDay] = useState(firstDay.getDay() + 1);
    const [monthLength, setMonthLength] = useState(daysBetween(firstDay, lastDay) + 1);
    useEffect(
        function refetchOnMonthChange() {
            setMonthLabel(getMonthName(dpMonth));
            const firstDayLocal = new Date(year, dpMonth - 1, 1);
            setFirstDay(firstDayLocal);
            const lastDayLocal = new Date(year, dpMonth, 0);
            setLastDay(lastDayLocal);
            setStartDay(firstDayLocal.getDay() + 1);
            setMonthLength(daysBetween(firstDayLocal, lastDayLocal) + 1);
        }, [dpMonth])

    const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const changeMonth = (increment: number) => {
        setDpMonth(dpMonth + increment);
    }

    const setDate = (date: number) => {
        setDay(date);
        setMonth(dpMonth);
        setShowDatePicker(false)
    }

    return (
        <Card>
            <div className='datepicker-wrapper'>
                <div className='datepicker-month'>
                    <div className='datepicker-month-label'>
                        <ChevronButton direction="left" clickFunction={() => changeMonth(-1)} borderRadiusSide='all' small />
                        <h1>{monthLabel}</h1>
                        {dpMonth != 12 && <ChevronButton direction="right" clickFunction={() => changeMonth(1)} borderRadiusSide='all' small />}
                    </div>
                </div>

                <div>
                    <div className='calendar-list'>
                        {dayList.map((day, i) => {
                            return <div key={i} className='datepicker-day'>
                                <p>{day}</p>
                            </div>
                        })}
                        {Array.from({ length: monthLength }, (_, i) => {
                            const isToday = i + 1 == today.getDate() && dpMonth == today.getMonth() + 1;
                            return (

                                <div style={i + 1 == 1 ? { gridColumnStart: startDay } : undefined}>
                                    <button className={`datepicker-button ${isToday ? 'date-picker-today' : ''}`} onClick={() => setDate(i + 1)}>{i + 1}</button>
                                </div>

                            )
                        })}
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default DatePicker