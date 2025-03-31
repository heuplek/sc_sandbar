import { TideRespObj, useCalendarContext, WeatherObj } from "../../context/calendarContext";
import StarPanel from "../starPanel/starPanel";
import Sun from "../../assets/sun.svg";
import Rain from "../../assets/rain.svg";
import PartlyCloudy from "../../assets/partly_cloudy.svg";
import ChanceOfRain from "../../assets/chance_of_rain.svg";
import DayLoader from "../dayLoader/dayLoader";

type CalendarDayProps = {
    date: number;
    startDay: number;
    today: Date;
    dayData: TideRespObj;
    weatherData: WeatherObj[];
    isPending?: boolean;
}

const MobileCalendarDay = ({ date, today, dayData, weatherData, isPending }: CalendarDayProps) => {
    const { month } = useCalendarContext();
    const isToday = date == today.getDate() && month == today.getMonth() + 1;
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
        <div className={`${isToday ? "mobile-day--today" : ""} mobile-day`} >
            {isPending && <DayLoader />}
            {!isPending &&
                <div className="calendar-day--content">
                    <div className="mobile-date--container">
                        {weatherIcon && <img className="mobile-weather" src={weatherIcon} alt={weatherIconAlt} height="48" />}
                    </div>
                    <div className={weatherData ? "calendar-columns" : "calendar-columns--no-weather"}>
                        <div >
                            <h3 className="mobile-column-header">Tides</h3>
                            {dayData?.tides.map((tide, i) => {
                                return (
                                    <div key={i}>
                                        <p className="drawer-content--bold">{tide.type == "L" ? "Low" : "High"}</p>
                                        <p>{tide.time} {tide.height} ft</p>
                                        {tide?.sandbar_window && tide?.sandbar_window[0].endsWith("PM") && (
                                            <div className="sandbar-window">
                                                <p>Sandbar Window: </p>
                                                <p>{tide.sandbar_window}</p>
                                            </div>)}
                                    </div>
                                )
                            })}
                        </div>
                        {weatherData && <div>
                            <h3 className="mobile-column-header">Weather</h3>
                            {weatherData?.map((period, i) => {
                                const rainChance = period.percipChance == undefined ? "0" : period.percipChance;
                                return (
                                    <div key={i} >
                                        <p className="drawer-content--bold">{period.name}:</p>
                                        <p>{period.detailedForecast}</p>
                                        <p>Chance of rain: {rainChance}%</p>
                                        <p>Temperature: {period.temperature}F</p>
                                        <p>Wind: {period.windSpeed}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                    {dayData && dayData.tides.map((tide, i) => {
                        if (tide.sandbar_rating != 0 && tide.sandbar_rating != undefined) {
                            return (
                                (<div key={i} className="mobile-stars">
                                    {(tide.sandbar_rating) &&
                                        <><p>Rating</p><StarPanel numStars={tide.sandbar_rating} large={true} /></>
                                    }
                                </div>)
                            )
                        }
                    })}
                </div>
            }
        </div>
    )
}

export default MobileCalendarDay