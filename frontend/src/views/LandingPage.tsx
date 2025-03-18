import { useState } from "react";
import Calendar from "../components/calendar/calendar";
import "./LandingPage.css"
import LeftDrawerContainer from "../components/drawer/leftDrawerContainer";
import RightDrawerContainer from "../components/drawer/rightDrawerContainer";
import { useWindowSize } from "../hooks/useWindowSize";
import Card from "../components/card/card";
import MobileCalendar from "../components/mobileCalendar/mobileCalendar";

const LandingPage = () => {
    const [aboutOpen, setAboutOpen] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 784;
    return (
        aboutOpen ?
            (
                <>
                    {/* PUT ABOUT PAGE HERE */}
                    <div className="about">
                        <Card>
                            <button onClick={() => setAboutOpen(!aboutOpen)} className="about-button">Back To Calendar</button>
                        </Card>
                    </div>
                </>
            )
            :
            (
                <>
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
                </>
            )
    )
}

export default LandingPage;