import { TideRespObj, useCalendarContext, WeatherObj } from "../../context/calendarContext";
import StarPanel from "../starPanel/starPanel";
import Sun from "../../assets/sun.svg";
import Rain from "../../assets/rain.svg";
import PartlyCloudy from "../../assets/partly_cloudy.svg";
import ChanceOfRain from "../../assets/chance_of_rain.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import DayLoader from "../dayLoader/dayLoader";
import { useEffect, useState } from "react";

type CalendarDayProps = {
    date: number;
    startDay: number;
    today: Date;
    dayData: TideRespObj;
    weatherData: WeatherObj[];
    isPending?: boolean;
}

const CalendarDay = ({ date, startDay, today, dayData, weatherData, isPending }: CalendarDayProps) => {
    const { setRightDrawerOpen, setLeftDrawerOpen, setTideData, setWeatherData, month, setDay, day } = useCalendarContext();
    useEffect(() => {
        if (date == day && month == today.getMonth() + 1) {
            openData();
        }
    }, [dayData, weatherData]);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(date == day);
    }, [day, month]);

    const isToday = date == today.getDate() && month == today.getMonth() + 1;
    let beforeToday = false
    const { width } = useWindowSize();
    if (date < today.getDate() && month <= today.getMonth() + 1) {
        beforeToday = true;
    }

    const openData = () => {
        //let the animation happen before hydrating data to prevent flashing as content grows
        console.log("openData");
        setTimeout(() => {
            setDay(date);
            setTideData(dayData);
            setWeatherData(weatherData);
        }, 200);
        if (width < 1403) {
            setRightDrawerOpen(true);
            setLeftDrawerOpen(false);
        } else if (!weatherData) {
            setRightDrawerOpen(true);
            setLeftDrawerOpen(false);
        } else {
            setRightDrawerOpen(true);
            setLeftDrawerOpen(true);
        }
    }

    let weatherIcon;
    let weatherIconAlt = "weather";
    if (weatherData) {
        weatherIcon = Sun;
        const dayWeather = weatherData[0];
        if (dayWeather.detailedForecast.toLocaleLowerCase().includes("cloudy")) {
            weatherIcon = PartlyCloudy;
            weatherIconAlt = "partly cloudy";
        }
        if (dayWeather.percipChance > 20) {
            weatherIcon = ChanceOfRain;
            weatherIconAlt = "chance of rain";
        }
        if (dayWeather.percipChance > 60) {
            weatherIcon = Rain;
            weatherIconAlt = "rain";
        }
    }
    return (
        <div className={`${isSelected ? "calendar-day--selected" : ""} calendar-day`} style={date == 1 ? { gridColumnStart: startDay } : undefined} >
            {isPending && <DayLoader />}
            <span className={`${isToday ? "calendar-date--today" : ""} calendar-date`}>{date}</span>
            {!isPending &&
                <button className={`calendar-day--button ${beforeToday ? "old-date" : ""}`} onClick={openData} aria-label={`Open Tide and Data Drawer for ${date}`}>
                    <div className="calendar-day--content">
                        {weatherIcon && <img className="calendar-weather" src={weatherIcon} alt={weatherIconAlt} />}
                        {!beforeToday && dayData && dayData.tides.map((tide, i) => {
                            if (tide.sandbar_rating != 0 && tide.sandbar_rating) {
                                return (
                                    (<div key={i} className="calendar-stars">
                                        {(tide.sandbar_rating) &&
                                            <StarPanel numStars={tide.sandbar_rating} />
                                        }
                                    </div>)
                                )
                            }

                        })}
                    </div>
                </button>
            }
        </div>
    )
}

export default CalendarDay