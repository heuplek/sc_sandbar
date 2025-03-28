import "./drawer.css";
import { useRef } from "react";
import TideDrawerContent from "./tideDrawerContent";
import { useCalendarContext } from "../../context/calendarContext";
import WeatherDrawerContent from "./weatherDrawerContent";
import { useWindowSize } from "../../hooks/useWindowSize";
import ChevronButton from "../chevronButton/chevronButton";


const RightDrawerContainer = () => {
    const { rightDrawerOpen, setRightDrawerOpen } = useCalendarContext();
    //Window Resize close drawers if both are open to prevent wonky layout
    const { width } = useWindowSize();

    const rightSidebarRef = useRef(null);
    const closeDrawer = () => () => {
        setRightDrawerOpen(!rightDrawerOpen);
    }
    if (width < 784) {
        setRightDrawerOpen(false);
    }

    return (

        <div
            ref={rightSidebarRef}
            className={rightDrawerOpen ? `right-sidebar active` : 'right-sidebar'}
            data-sidebaropen={rightDrawerOpen}
        >
            <div className="sidebar-content">
                {rightDrawerOpen ?
                    (
                        <>
                            <div className="button-container--right">
                                <ChevronButton direction="right" clickFunction={closeDrawer()} borderRadiusSide="right" />
                            </div>
                            <TideDrawerContent />
                            {width < 1403 && <WeatherDrawerContent />}
                        </>
                    ) : <></>}
            </div>
        </div>
    )
}

export default RightDrawerContainer;