import { TideRespObj, useCalendarContext } from "../../context/calendarContext";
import StarPanel from "../starPanel/starPanel";

type CalendarDayProps = {
    date: number;
    startDay: number;
    today: number;
    dayData: TideRespObj;
}

const CalendarDay = ({ date, startDay, today, dayData }: CalendarDayProps) => {
    const { rightDrawerOpen, setRightDrawerOpen, setModalData } = useCalendarContext();
    const openModal = () => {
        console.log("open modal")
        setRightDrawerOpen(!rightDrawerOpen);
        setModalData(dayData);
    }
    return (
        <div className={`${date == today ? "calendar-day--today" : ""} calendar-day`} style={date == 1 ? { gridColumnStart: startDay } : undefined}>
            <div className="calendar-day--content">
                <span className="calendar-date">{date}</span>
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
                <button className="calendar-day--button" onClick={openModal}>View Tide Info</button>
            </div>
        </div>
    )
}

export default CalendarDay