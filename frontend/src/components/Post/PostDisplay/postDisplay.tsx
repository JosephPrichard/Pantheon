import dayjs from "dayjs";

export function getDisplay(date: Date) {
    const dayJsDate = dayjs(date);
    const hours = dayjs().diff(dayJsDate, "hours");
    if(hours < 1) {
        return " now";
    } else if (hours < 24) {
        return hours + (hours > 1 ? " hours ago" : " hour ago");
    } else if(hours < 730) {
        const days = Math.floor(hours / 24);
        return days + (days > 1 ? " days ago" : " day ago");
    } else if (hours < 8760) {
        const months = Math.floor(hours / 730);
        return months + (months > 1 ? " months ago" : " month ago");
    } else {
        const years = Math.floor(hours / 8760);
        return years + (years > 1 ? " years ago" : " year ago");
    }
}