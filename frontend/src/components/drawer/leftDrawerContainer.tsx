import "./drawer.css";
import { use, useRef } from "react";
import TideDrawerContent from "./tideDrawerContent";
import { useCalendarContext } from "../../context/calendarContext";
import WeatherDrawerContent from "./weatherDrawerContent";
import { useWindowSize } from "../../hooks/useWindowSize";
import ChevronButton from "../chevronButton/chevronButton";


const LeftDrawerContainer = () => {
    const { leftDrawerOpen, setLeftDrawerOpen, rightDrawerOpen} = useCalendarContext();
    //Window Resize close drawers if both are open to prevent wonky layout
    const { width } = useWindowSize();

    const rightSidebarRef = useRef(null);
    const leftSidebarRef = useRef(null);
    const closeDrawer = () => () => {
        setLeftDrawerOpen(!leftDrawerOpen);
    }

    if (width < 1403 && (leftDrawerOpen && rightDrawerOpen)) {
        setLeftDrawerOpen(false);
    }
    if (width < 784) {
        setLeftDrawerOpen(false);
    }

    return (

        <div
            ref={rightSidebarRef}
            className={leftDrawerOpen ? `left-sidebar active` : 'left-sidebar' }
            data-sidebaropen={leftDrawerOpen}
        >
            <div className="sidebar-content">
                {leftDrawerOpen ?
                    (
                        <>
                            <div className="button-container--left">
                                <ChevronButton direction="left" clickFunction={closeDrawer()} borderRadiusSide="left" />
                            </div>
                            <WeatherDrawerContent />
                        </>
                    ) : <></>}
            </div>
        </div>
    )
}

export default LeftDrawerContainer;