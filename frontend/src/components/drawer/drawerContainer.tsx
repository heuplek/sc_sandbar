import "./drawer.css";
import React, { useState, useRef } from "react";
import TideDrawerContent from "./tideDrawerContent";
import { useCalendarContext } from "../../context/calendarContext";
import WeatherDrawerContent from "./weatherDrawerContent";
import Forward from "../../assets/forward.svg";
import Back from "../../assets/back.svg";

type DrawerContainerProps = {
    side: string;
}

const DrawerContainer = ({ side }: DrawerContainerProps) => {
    const { leftDrawerOpen, setLeftDrawerOpen, rightDrawerOpen, setRightDrawerOpen } = useCalendarContext();

    const rightSidebarRef = useRef(null);
    const leftSidebarRef = useRef(null);
    const isRightDrawer = side === "right";
    const className = isRightDrawer ? "right-sidebar" : "left-sidebar";
    const closeDrawer = (isRightDrawer: boolean) => () => {
        if (isRightDrawer) {
            setRightDrawerOpen(!rightDrawerOpen);
        } else {
            setLeftDrawerOpen(!leftDrawerOpen);
        }
    }
    
    return (
        <div data-open={isRightDrawer ? rightDrawerOpen : leftDrawerOpen}>
            <div
                ref={isRightDrawer ? rightSidebarRef : leftSidebarRef}
                className={isRightDrawer ? rightDrawerOpen ? `${className} active` : className : leftDrawerOpen ? `${className} active` : className}
                data-sidebaropen={isRightDrawer ? rightDrawerOpen : leftDrawerOpen}
            >
                <div className="sidebar-content">
                {isRightDrawer && rightDrawerOpen &&
                    (
                        <>
                            <button className={`close-button--right`} onClick={closeDrawer(isRightDrawer)}><img src={Forward} alt="close drawer" /></button>
                            <TideDrawerContent />
                            </>
                    )}
                    </div>
                    <div className="sidebar-content">
                {!isRightDrawer && leftDrawerOpen ?
                    (
                        <>
                            <button className={`close-button--left`} onClick={closeDrawer(isRightDrawer)}><img src={Back} alt="close drawer" /></button>
                            <WeatherDrawerContent />
                            </>
                    ): <></>}
                     </div>
            </div>
        </div>
    )
}

export default DrawerContainer;