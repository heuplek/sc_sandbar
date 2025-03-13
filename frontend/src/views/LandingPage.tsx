import { CalendarProvider } from "../context/calendarContext";
import Calendar from "../components/calendar/calendar";
import "./LandingPage.css"
import Card from "../components/card/card";

const LandingPage = () => {
    return (
        <>
            <div className="card-area">
                <Card>
                    <p>
                        Welcome to the Beaufort Sandbar Tracker! This app is designed to help you keep track of the tides at the Beaufort Sandbar.
                        The tide times are updated daily, and you can view the tide times for the entire month.
                        The tide times are color-coded to help you quickly see when the best time to visit the sandbar is.
                        The app also includes a map of the sandbar, so you can easily find your way there.
                        We hope you enjoy using the Beaufort Sandbar Tracker!
                    </p>

                </Card>
                <Card>
                    <p>
                        Welcome to the Beaufort Sandbar Tracker! This app is designed to help you keep track of the tides at the Beaufort Sandbar.
                        The tide times are updated daily, and you can view the tide times for the entire month.
                        The tide times are color-coded to help you quickly see when the best time to visit the sandbar is.
                        The app also includes a map of the sandbar, so you can easily find your way there.
                        We hope you enjoy using the Beaufort Sandbar Tracker!
                    </p>
                </Card>
            </div>
                <Calendar />
        </>
    )
}

export default LandingPage;