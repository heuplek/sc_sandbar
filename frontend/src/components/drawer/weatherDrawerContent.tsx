import "./drawer.css";
import { useCalendarContext } from "../../context/calendarContext";

const WeatherDrawerContent = () => {
    const { weatherData } = useCalendarContext();
    const dateArr =  weatherData && weatherData[0].date.split('-');
    return (
        <div className="drawer-content">
            <h2 className="drawer-content--header">Weather Info</h2>
            <p className="drawer-content--date">{dateArr && dateArr[1] + "/" + dateArr[2] + "/" +dateArr[0]}</p>
            {!weatherData && <p>No tide data available</p>}
            {weatherData?.map((period, i) => {
                const rainChance = period.percipChance == undefined ? "0" : period.percipChance;
                return (
                    <div key={i}>
                        <p className="drawer-content--bold">{period.name}:</p>
                        <p>{period.detailedForecast}</p>
                        <p>Chance of rain: {rainChance}%</p>
                        <p>Temperature: {period.temperature}F</p>
                        <p>Wind: {period.windSpeed}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default WeatherDrawerContent;