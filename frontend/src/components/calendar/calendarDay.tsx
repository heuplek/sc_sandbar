import { TideRespObj, useCalendarContext, WeatherObj } from "../../context/calendarContext";
import StarPanel from "../starPanel/starPanel";
import Sun from "../../assets/sun.svg";
import Rain from "../../assets/rain.svg";
import PartlyCloudy from "../../assets/partly_cloudy.svg";
import ChanceOfRain from "../../assets/chance_of_rain.svg";

type CalendarDayProps = {
    date: number;
    startDay: number;
    today: number;
    dayData: TideRespObj;
    weatherData: WeatherObj[];
}

const CalendarDay = ({ date, startDay, today, dayData, weatherData }: CalendarDayProps) => {
    const { rightDrawerOpen, setRightDrawerOpen, leftDrawerOpen, setLeftDrawerOpen, setTideData, setWeatherData } = useCalendarContext();
    const openRight = () => {
        setRightDrawerOpen(true);
        setTideData(dayData);
        setWeatherData(weatherData);
    }
    const openLeft = () => {
        setLeftDrawerOpen(true);
        setWeatherData(weatherData);
        setTideData(dayData);
    }
    let weatherIcon;
    if (weatherData) {
        weatherIcon = Sun;
        const dayWeather = weatherData[0];
        if (dayWeather.detailedForecast.toLocaleLowerCase().includes("cloudy")) {
            weatherIcon = PartlyCloudy;
        }
        if (dayWeather.percipChance > 20) {
            weatherIcon = ChanceOfRain;
        } else if (dayWeather.percipChance > 60) {
            weatherIcon = Rain;
        }
    }
    return (
        <div className={`${date == today ? "calendar-day--today" : ""} calendar-day`} style={date == 1 ? { gridColumnStart: startDay } : undefined}>
            <div className="calendar-day--content">
                <span className="calendar-date">{date}</span>
                {weatherIcon && <img className="calendar-weather" src={weatherIcon} alt="close drawer" />}
                {dayData && dayData.tides.map((tide, i) => {
                    if (tide.sandbar_rating == 0) {
                        return (
                            <></>
                        )
                    }
                    return (
                        (<div key={i} className="">
                            {(tide.sandbar_rating) &&
                                <StarPanel numStars={tide.sandbar_rating} />
                            }
                        </div>)
                    )
                })}
                <button className="calendar-day--button" onClick={openRight}>View Tide Info</button>
                {weatherData && < button className="calendar-day--button" onClick={openLeft}>View wx Info</button>}
            </div>
        </div>
    )
}

export default CalendarDay