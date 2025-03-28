export const getLongDate = (dateStr: string) => {
    var date = dateStr && new Date(dateStr?.replace(/-/g, '/'));
    return date && date.toLocaleDateString('en-US', { weekday: 'long' });
};
