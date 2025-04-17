//Need to dig into why mobile browsers are not recognizing:

//Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(dpMonth.toString()))

//For now a quick string lookup using month number will work:

const longMonthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const getMonthName = (month: number) => {
    if (month < 1 || month > 12) {
        throw new Error('Month must be between 1 and 12');
    }
    return longMonthNames[month - 1];
};
