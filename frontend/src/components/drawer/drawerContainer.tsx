import "./drawer.css";
import React, { useState, useRef } from "react";
import TideDrawerContent from "./tideDrawerContent";
import { useCalendarContext } from "../../context/calendarContext";
import WeatherDrawerContent from "./weatherDrawerContent";
import Forward from "../../assets/forward.svg";
import Back from "../../assets/back.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import ChevronButton from "../chevronButton/chevronButton";

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

    //Window Resize close drawers if both are open to prevent wonky layout
    const { width } = useWindowSize();
    if (width < 1391 && (leftDrawerOpen && rightDrawerOpen)) {
        setLeftDrawerOpen(false);
        setRightDrawerOpen(false);
    }

    return (

            <div
                ref={isRightDrawer ? rightSidebarRef : leftSidebarRef}
                className={isRightDrawer ? rightDrawerOpen ? `${className} active` : className : leftDrawerOpen ? `${className} active` : className}
                data-sidebaropen={isRightDrawer ? rightDrawerOpen : leftDrawerOpen}
            >
                <div className="sidebar-content">
                {isRightDrawer && rightDrawerOpen &&
                    (
                        <>
                        <div className="button-container--right">
                            <ChevronButton direction="right" clickFunction={closeDrawer(isRightDrawer)} borderRadiusSide="right" />
                        </div>
                            <TideDrawerContent />
                            </>
                    )}
                    </div>
                    <div className="sidebar-content">
                {!isRightDrawer && leftDrawerOpen ?
                    (
                        <>
                            <div className="button-container--left">
                                <ChevronButton direction="left" clickFunction={closeDrawer(isRightDrawer)} borderRadiusSide="left" />
                            </div>
                            <WeatherDrawerContent />
                            </>
                    ) : <></>}
            </div>
        </div>
    )
}

export default DrawerContainer;