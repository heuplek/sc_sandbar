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

export type WeatherObj = {
    name: string;
    detailedForecast: string;
    percipChance: number;
    temperature: number;
    windSpeed: number;
    date: string;
}

export interface CalendarContextType {
    day: number;
    setDay: (day: number) => void;
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
    calendarData: TideRespObj[];
    setCalendarData: (calendarData: TideRespObj[]) => void;
    leftDrawerOpen: boolean;
    setLeftDrawerOpen: (leftDrawerOpen: boolean) => void;
    rightDrawerOpen: boolean;
    setRightDrawerOpen: (leftDrawerOpen: boolean) => void;
    tideData: TideRespObj | undefined;
    setTideData: (modalData: TideRespObj) => void;
    weatherData: WeatherObj[] | undefined;
    setWeatherData: (modalData: WeatherObj[]) => void;
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
    const [day, setDay] = useState<number>(today.getDate());
    const [year, setYear] = useState<number>(today.getFullYear());
    const [leftDrawerOpen, setLeftDrawerOpen] = useState<boolean>(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState<boolean>(false);
    const [tideData, setTideData] = useState<TideRespObj>();
    const [weatherData, setWeatherData] = useState<WeatherObj[]>([]);
    //not actually using this yet
    const [calendarData, setCalendarData] = useState<TideRespObj[]>([]);

    const value: CalendarContextType = {
        day,
        setDay,
        month,
        setMonth,
        year,
        setYear,
        calendarData,
        setCalendarData,
        leftDrawerOpen,
        setLeftDrawerOpen,
        rightDrawerOpen,
        setRightDrawerOpen,
        tideData,
        setTideData,
        weatherData,
        setWeatherData,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
