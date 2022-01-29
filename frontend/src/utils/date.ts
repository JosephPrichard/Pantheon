import dayjs from "dayjs";

export function formatCreatedAt(dateStr: string) {
    const date = new Date(dateStr);
    return dayjs(date).format("MMM DD, YYYY");
}