import "./drawer.css";
import { useCalendarContext } from "../../context/calendarContext";
import { getLongDate } from "../../helpers/getLongDate";

const WeatherDrawerContent = () => {
    const { weatherData } = useCalendarContext();
    const dateArr = weatherData && weatherData[0]?.date.split('-');
    const weekDay = weatherData && getLongDate(weatherData[0]?.date);
    return weatherData ? (
        <div className="drawer-content">
            <h2 className="drawer-content--header">Weather</h2>
            <p className="drawer-content--date">{weekDay}</p>
            <p className="drawer-content--date">{dateArr && dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0]}</p>
            {!weatherData && <p>No tide data available</p>}
            {weatherData?.map((period, i) => {
                const rainChance = period.percipChance == undefined ? "0" : period.percipChance;
                return (
                    <div key={i}>
                        <p className="drawer-content--bold">{period.name}:</p>
                        <p>{period.detailedForecast}</p>
                        <ul>
                            <li>Chance of rain: {rainChance}%</li>
                            <li>High: {period.temperature}F</li>
                            <li>Wind: {period.windSpeed}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    ) : (<></>)
}

export default WeatherDrawerContent;