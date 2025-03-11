import React, { createContext, useContext, useState } from "react";

export type TideObj = {
    type: string;
    time: string;
    height: string;
    sandbar_rating: number;
    sandbar_window: string[];
}
export type TideRespObj = {
    date: string;
    day: string;
    tides: TideObj[];
}

export interface CalendarContextType {
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
    calendarData: TideRespObj[];
    setCalendarData: (calendarData: TideRespObj[]) => void;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    modalData: TideRespObj | undefined;
    setModalData: (modalData: TideRespObj) => void;
}

const AppContext = createContext<CalendarContextType | undefined>(undefined);

export function useCalendarContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
}

export function CalendarProvider({ children }: { children: React.ReactNode }) {
    const today = new Date();
    const [month, setMonth] = useState<number>(today.getMonth() + 1);
    const [year, setYear] = useState<number>(today.getFullYear());
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<TideRespObj>();
    //not actually using this yet
    const [calendarData, setCalendarData] = useState<TideRespObj[]>([]);

    const value: CalendarContextType = {
        month,
        setMonth,
        year,
        setYear,
        calendarData,
        setCalendarData,
        modalOpen,
        setModalOpen,
        modalData,
        setModalData
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
