import "./drawer.css";
import { useCalendarContext } from "../../context/calendarContext";

const TideDrawerContent = () => {
    const { tideData } = useCalendarContext();
    const dateArr = tideData && tideData?.date.split('-');
    return (
        <div className="drawer-content">
            <h2 className="drawer-content--header">Tide</h2>
            {!tideData && <p>No tide data available</p>}
            <p className="drawer-content--date">{dateArr && dateArr[1] + "/" + dateArr[2] + "/" +dateArr[0]}</p>
            {tideData?.tides.map((tide, i) => {
                return (
                    <div key={i}>
                        <p className="drawer-content--bold">{tide.type == "L" ? "Low" : "High"}</p>
                        <p>{tide.time} {tide.height} ft</p>
                        {tide.sandbar_window && (
                            <div className="sandbar-window">
                                <p>Sandbar Window: </p>
                                <p>{tide.sandbar_window}</p>
                            </div>)}
                    </div>
                )
            })}
        </div>
    )
}

export default TideDrawerContent;