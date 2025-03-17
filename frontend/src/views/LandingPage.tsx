import Calendar from "../components/calendar/calendar";
import "./LandingPage.css"
import DrawerContainer from "../components/drawer/drawerContainer";
import { useWindowSize } from "../hooks/useWindowSize";
import MobileCalendar from "../components/mobileCalendar/mobileCalendar";

const LandingPage = () => {
    const { width } = useWindowSize();
    const isMobile = width < 784;
    return (
        <div className="landing-page">
            <DrawerContainer side="left" />
            {!isMobile && <Calendar />}
            {isMobile && <MobileCalendar />}
            <DrawerContainer side="right" />
        </div >
    )
}

export default LandingPage;