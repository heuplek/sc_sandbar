import { useMutation } from '@tanstack/react-query';
import { useCalendarContext } from '../context/calendarContext';

const getMonthTideRatings = async (month: number, year: number, weekdayIdealLow: number, weekendIdealLow: number) => {

    const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'https://sc-sandbar.onrender.com';
    const response = await fetch(`${apiUrl}/tides`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        redirect: 'follow',
        body: JSON.stringify({ month, year, weekdayIdealLow, weekendIdealLow }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useGetMonthTideRatings = () => {
    const { month, year, weekdayIdealLow, weekendIdealLow, setCalendarData, setErrorObj } = useCalendarContext();
    const {
        mutate,
        data: data,
        isPending,
    } = useMutation({
        mutationFn: () => getMonthTideRatings(month, year, weekdayIdealLow, weekendIdealLow),
        onSuccess: (data) => {
            setCalendarData(data);
            setErrorObj(undefined);
        },
        onSettled: () => {},
        onError: (error) => {
            setErrorObj('Error fetching tide ratings. Please try again later.');
            throw error;
        },
    });
    return { mutate, data, isPending };
};
