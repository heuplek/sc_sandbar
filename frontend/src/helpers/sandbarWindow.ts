export const sandbarWindow = (time: number, sandbarDuration: number) => {
    const split = sandbarDuration / 2;
    const start = time - split;
    const end = time + split;
    const startTime = new Date();
    startTime.setHours(start, (start % 1) * 60, 0, 0);
    const endTime = new Date();
    endTime.setHours(end, (end % 1) * 60, 0, 0);
    const startString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endString = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return '' + startString + ' - ' + endString;
};
