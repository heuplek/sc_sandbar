import Calendar from "../components/calendar/calendar";
import "./LandingPage.css"
import DrawerContainer from "../components/drawer/drawerContainer";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <DrawerContainer side="right" />
            <DrawerContainer side="left" />
            <Calendar />
        </div >
    )
}

export default LandingPage;