import React, { useState } from "react";
import { TideRespObj, useCalendarContext } from "../../context/calendarContext";

type CalendarDayProps = {
    date: number;
    startDay: number;
    today: number;
    dayData: TideRespObj;
}

const CalendarDay = ({ date, startDay, today, dayData}: CalendarDayProps) => {
    const { modalOpen, setModalOpen, setModalData } = useCalendarContext();
    const openModal = () => {
        console.log("open modal")
        setModalOpen(!modalOpen);
        setModalData(dayData);
    }
    return (
        <div className={`${date==today ? "calendar-day--today" : ""} calendar-day`} style={date == 1 ? {gridColumnStart: startDay} : undefined}>
            <span className="calendar-date">{date}</span>
            {dayData && dayData.tides.map((tide, i) => {
                return (
                    (<div key={i} className={`calendar-tide-${tide.sandbar_rating}`}>
                       {tide.sandbar_rating != 0 && 
                        <span className="calendar-tide-height">{tide.sandbar_window}</span>}
                    </div>)
                )
            })}
            <button onClick={openModal}>View Tide Info</button>
        </div>
    )
}

export default CalendarDay