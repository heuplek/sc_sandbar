import { TideRespObj, useCalendarContext, WeatherObj } from "../../context/calendarContext";
import StarPanel from "../starPanel/starPanel";
import Sun from "../../assets/sun.svg";
import Rain from "../../assets/rain.svg";
import PartlyCloudy from "../../assets/partly_cloudy.svg";
import ChanceOfRain from "../../assets/chance_of_rain.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import DayLoader from "../dayLoader/dayLoader";

type CalendarDayProps = {
    date: number;
    startDay: number;
    today: Date;
    dayData: TideRespObj;
    weatherData: WeatherObj[];
    isPending?: boolean;
}

const CalendarDay = ({ date, startDay, today, dayData, weatherData, isPending }: CalendarDayProps) => {
    const { setRightDrawerOpen, setLeftDrawerOpen, setTideData, setWeatherData, month } = useCalendarContext();
    const isToday = date == today.getDate() && month == today.getMonth() + 1;
    const { width } = useWindowSize();
    const openData = () => {
        setTideData(dayData);
        setWeatherData(weatherData);
        if (width < 1391) {
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
        <div className={`${isToday ? "calendar-day--today" : ""} calendar-day`} style={date == 1 ? { gridColumnStart: startDay } : undefined} onClick={openData} role="button">
            {isPending && <DayLoader />}
            <span className="calendar-date">{date}</span>
            {!isPending &&
                <button className="calendar-day--button">
                    <div className="calendar-day--content">
                        {weatherIcon && <img className="calendar-weather" src={weatherIcon} alt="close drawer" />}
                        {dayData && dayData.tides.map((tide, i) => {
                            if (tide.sandbar_rating == 0) {
                                return (
                                    <div key={i} className=""></div>
                                )
                            }
                            return (
                                (<div key={i} className="calendar-stars">
                                    {(tide.sandbar_rating) &&
                                        <StarPanel numStars={tide.sandbar_rating} />
                                    }
                                </div>)
                            )
                        })}
                    </div>
                </button>
            }
        </div>
    )
}

export default CalendarDay