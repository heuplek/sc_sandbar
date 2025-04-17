import { useEffect, useState } from "react";
import Calendar from "../../components/calendar/calendar";
import "./LandingPage.css"
import LeftDrawerContainer from "../../components/drawer/leftDrawerContainer";
import RightDrawerContainer from "../../components/drawer/rightDrawerContainer";
import { useWindowSize } from "../../hooks/useWindowSize";
import Card from "../../components/card/card";
import MobileCalendar from "../../components/mobileCalendar/mobileCalendar";
import AboutPage from "../About/About";
import Select from "../../components/select/Select";
import { useCalendarContext } from "../../context/calendarContext";
import { sandbarWindow } from "../../helpers/sandbarWindow";
import { getLongDate } from "../../helpers/getLongDate";

const LandingPage = () => {
    const [aboutOpen, setAboutOpen] = useState(false);
    const [weekendSandbarWindow, setWeekendSandbarWindow] = useState<String>("");
    const [weekdaySandbarWindow, setWeekdaySandbarWindow] = useState<String>("");
    const [isWeekend, setIsWeekend] = useState(false);
    const { weekendIdealLow, setWeekendIdealLow, weekdayIdealLow, setWeekdayIdealLow, day, month, year } = useCalendarContext();
    const dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + (day) : day);
    const longDay = getLongDate(dateStr);
    useEffect(()=>{
        if (longDay == "Saturday" || longDay == "Sunday") {
            setIsWeekend(true);
        }else{
            setIsWeekend(false);
        }
    }, [longDay])
    const { width } = useWindowSize();
    const isMobile = width < 784;
    useEffect(() => {
        if (weekendIdealLow) {
            setWeekendSandbarWindow(sandbarWindow(weekendIdealLow, 3));
        }
        if (weekdayIdealLow) {
            setWeekdaySandbarWindow(sandbarWindow(weekdayIdealLow, 3));
        }
    }, [weekendIdealLow, weekdayIdealLow]);
    return (
        aboutOpen ?
            (
                <AboutPage aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
            )
            :

            <main>
                <div className="user-inputs-wrapper">
                    {isWeekend && <Card>
                        <div className="user-inputs-content">
                            <h2>Weekend</h2>
                            <Select value={weekendIdealLow} setValue={setWeekendIdealLow} frame="weekend" />
                            <p className="user-inputs-window">Sandbar window: {weekendSandbarWindow}</p>
                        </div>
                    </Card>}
                    {!isWeekend && <Card>
                        <div className="user-inputs-content">
                            <h2>Week</h2>
                            <Select value={weekdayIdealLow} setValue={setWeekdayIdealLow} frame="weekday" />
                            <p className="user-inputs-window">Sandbar window: {weekdaySandbarWindow}</p>
                        </div>
                    </Card>}
                </div>
                <div className="landing-page">
                    <LeftDrawerContainer />
                    {!isMobile && <Calendar />}
                    {isMobile && <MobileCalendar />}
                    <RightDrawerContainer />
                </div >
                <div className="about">
                    <Card>
                        <button className="about-button" onClick={() => setAboutOpen(!aboutOpen)}>Click Here To Learn More About This App</button>
                    </Card>
                </div>
            </main>

    )
}

export default LandingPage;