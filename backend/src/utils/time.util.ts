import { ALLTIME, TimeType } from "../global";

export function timeTypeToDate(time?: TimeType) {
    return time && time !== ALLTIME ? calculateDate(time) : undefined;
}

export function calculateDate(time: TimeType) {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    switch(time) {
        case "day": {
            const newDate = new Date();
            newDate.setDate(date - 1);
            return newDate;
        }
        case "week": {
            const newDate = new Date();
            newDate.setDate(date - 7);
            return newDate;
        }
        case "month": {
            return new Date(year, month - 1, date);
        }
        case "year": {
            return new Date(year - 1, month, date);
        }
    }
}