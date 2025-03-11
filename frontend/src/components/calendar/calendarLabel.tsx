
type CalendarLabelProps = {
    day: string;
}

const CalendarLabel = ({ day }: CalendarLabelProps) => {
    return (
        <div className="calendar-day-labels">
            <span className="calendar-day-label">{day}</span>
        </div>
    )
}

export default CalendarLabel