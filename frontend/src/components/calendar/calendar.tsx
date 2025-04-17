import './calendar.css';
import CalendarDay from './calendarDay';
import CalendarLabel from './calendarLabel';
import { daysBetween } from '../../helpers/daysBetween';
import { useEffect, useState } from 'react';
import { useGetMonthTideRatings } from '../../api/getTideRatings';
import { useCalendarContext } from '../../context/calendarContext';
import Card from '../card/card';
import ChevronButton from '../chevronButton/chevronButton';
import OffSeason from '../offSeason/offSeason';
import { getMonthName } from '../../helpers/getMonthName';


const Calendar = () => {
    const { month, year, setMonth, setDay, setTideData, setWeatherData, weekdayIdealLow, weekendIdealLow, setLeftDrawerOpen } = useCalendarContext();
    const today = new Date();
    const { mutate: getMonthTideRatings, data, isPending } = useGetMonthTideRatings();
    const [monthLabel, setMonthLabel] = useState(getMonthName(month));
    const [firstDay, setFirstDay] = useState(new Date(year, month - 1, 1));
    const [lastDay, setLastDay] = useState(new Date(year, month, 0));
    const [startDay, setStartDay] = useState(firstDay.getDay() + 1);
    const [monthLength, setMonthLength] = useState(daysBetween(firstDay, lastDay) + 1);
    let offSeason = false;
    useEffect(
        function refetchOnMonthChange() {
            setMonthLabel(getMonthName(month));
            const firstDayLocal = new Date(year, month - 1, 1);
            setFirstDay(firstDayLocal);
            const lastDayLocal = new Date(year, month, 0);
            setLastDay(lastDayLocal);
            setStartDay(firstDayLocal.getDay() + 1);
            setMonthLength(daysBetween(firstDayLocal, lastDayLocal) + 1);
            if (month == today.getMonth() + 1) {
                setDay(today.getDate());
            }
            setWeatherData([]);
            getMonthTideRatings();
        }, [month])
    useEffect(
        function refetchOnIdealChange() {
            getMonthTideRatings();
        }, [weekdayIdealLow, weekendIdealLow])

    useEffect(
        function resetWeatherAndTideCard() {
            if (month != today.getMonth() + 1) {
                setDay(1);
                setTideData(data && data.tides && data.tides[0]);
                const weather = data && data.weather && data?.weather[year + '-' + (month < 10 ? '0' + month : month) + '-' + (1 < 10 ? '0' + (1) : 1)];
                if (weather) {
                    setTimeout(() => {
                        setWeatherData(weather);
                    }, 200);
                    setLeftDrawerOpen(true);
                } else {
                    setWeatherData([]);
                    setLeftDrawerOpen(false);
                }
            }
        }, [data, month])
    const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (data == "It's Off Season") {
        offSeason = true;
    }

    const handleClick = (increment: number) => {
        setMonth(month + increment);
    }

    return (
        <Card calendarCard>
            <div className='calendar-container'>
                <div className='calendar-month'>
                    <div className='calendar-month-label'>
                        <ChevronButton direction="left" clickFunction={() => handleClick(-1)} borderRadiusSide='all' />
                        <h1>{monthLabel}</h1>
                        {month != 12 && <ChevronButton direction="right" clickFunction={() => handleClick(1)} borderRadiusSide='all' />}

                        <span className='calendar-year'>{today.getFullYear()}</span>

                    </div>
                </div>

                <div className="calendar-wrapper">

                    {offSeason && <OffSeason />}
                    {!offSeason && <div className='calendar-list'>
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
                    </div>}
                </div>

            </div>
        </Card>
    )
}

export default Calendar