import { useMutation } from "@tanstack/react-query";
import { useCalendarContext } from "../context/calendarContext";


const getMonthTideTimes = async (
    month: number,
    year: number
) => {
    const response = await fetch(`http://localhost:8000/tides?year=${year}&month=${month}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const useGetMonthTideTimes = () => {
    const { setCalendarData, month, year } = useCalendarContext();
    const {
        mutate,
        data: data,
        isPending,
    } = useMutation({
        mutationFn: () => getMonthTideTimes(month, year),
        onSuccess: (data) => {
            //console.log(data)
            setCalendarData(data.tides);
        },
        onSettled: () => {},
        onError: (error) => {
            //TODO: handle error
            throw error;
        },
    });
    return { mutate, data, isPending };
};