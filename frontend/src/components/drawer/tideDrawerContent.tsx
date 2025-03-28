import "./drawer.css";
import { useCalendarContext } from "../../context/calendarContext";
import { getLongDate } from "../../helpers/getLongDate";
import StarPanel from "../starPanel/starPanel";

const TideDrawerContent = () => {
    const { tideData } = useCalendarContext();
    const dateArr = tideData && tideData?.date.split('-');
    const weekDay = tideData && getLongDate(tideData?.date);
    console.log(tideData)
    return (
        <div className="drawer-content">
            <h2 className="drawer-content--header">Tide</h2>
            {!tideData && <p>No tide data available</p>}
            <p className="drawer-content--date">{weekDay}</p>
            <p className="drawer-content--date">{dateArr && dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0]}</p>
            <div className="tide-data">
                {tideData?.tides.map((tide, i) => {
                    return (
                        <div key={i} className="tide">
                            <p className="drawer-content--bold">{tide.type == "L" ? "Low Tide" : "High Tide"}</p>
                            <p>{tide.time} {tide.height} ft</p>
                            {tide?.sandbar_window && (
                                <div className="sandbar-window">
                                    <p>Sandbar Window: </p>
                                    <p>{tide.sandbar_window}</p>
                                    <StarPanel numStars={tide.sandbar_rating} />
                                </div>)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TideDrawerContent;