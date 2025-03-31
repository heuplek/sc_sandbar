import './mobileCalendar.css';
import MobileCalendarDay from './mobileCalendarDay';
import { useEffect, useState } from 'react';
import { useGetMonthTideRatings } from '../../api/getTideRatings';
import { useCalendarContext } from '../../context/calendarContext';
import Card from '../card/card';
import ChevronButton from '../chevronButton/chevronButton';
import DatePicker from '../datepicker/datepicker';
import { getLongDate } from '../../helpers/getLongDate';
import { getMonthName } from '../../helpers/getMonthName';


const MobileCalendar = () => {
    const { month, year, day, setDay, setMonth } = useCalendarContext();
    const today = new Date();
    const { mutate: getMonthTideRatings, data, isPending } = useGetMonthTideRatings();
    const [monthLabel, setMonthLabel] = useState(getMonthName(month));
    const [firstDay, setFirstDay] = useState(new Date(year, month - 1, 1));
    const [startDay, setStartDay] = useState(firstDay.getDay() + 1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    let offSeason = false;
    useEffect(() => {
        setMonthLabel(getMonthName(month));
        const firstDayLocal = new Date(year, month - 1, 1);
        setFirstDay(firstDayLocal);
        setStartDay(firstDayLocal.getDay() + 1);
        getMonthTideRatings();
    }, [month])
    useEffect(() => {
        const currDay = new Date(year, month - 1, day)
        if (currDay.getMonth() + 1 !== month) {
            setMonth(currDay.getMonth() + 1)
            setDay(currDay.getDate())
        }
    }, [day])
    if (data == "It's Off Season") {
        offSeason = true;
    }
    const dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + (day) : day);
    const longDay = getLongDate(dateStr);
    return (
        <Card calendarCard isMobile>
            <div className='calendar-container'>
                {!showDatePicker &&
                    <>
                        <p className='mobile-month'>{longDay}</p>
                        <h1 className='mobile-month'>{monthLabel} - {day}</h1>
                        {!offSeason && <MobileCalendarDay
                            date={day}
                            startDay={startDay}
                            today={today}
                            dayData={data && data.tides[day - 1]}
                            weatherData={data && data.weather[dateStr]}
                            isPending={isPending}
                        />}
                    </>
                }
                {showDatePicker && <DatePicker setShowDatePicker={setShowDatePicker} />}
            </div>

            <div className='calendar-buttons'>
                {!showDatePicker && <ChevronButton direction="left" clickFunction={() => { setDay(day - 1) }} borderRadiusSide='all' />}
                <button className='datepicker-open-button' onClick={() => { setShowDatePicker(!showDatePicker) }} >{showDatePicker ? "Close" : "Datepicker"}</button>
                {!showDatePicker && <ChevronButton direction="right" clickFunction={() => { setDay(day + 1) }} borderRadiusSide='all' />}
            </div>
        </Card>
    )
}

export default MobileCalendar