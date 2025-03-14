import Calendar from "../components/calendar/calendar";
import "./LandingPage.css"
import DrawerContainer from "../components/drawer/drawerContainer";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <DrawerContainer side="left" />
            <Calendar />
            <DrawerContainer side="right" />
        </div >
    )
}

export default LandingPage;