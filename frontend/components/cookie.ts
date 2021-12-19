import Cookies from "js-cookie";
import { SESSION_EXPIRY } from "../model/global";

export const USER_COOKIE = "USER";

interface CookieVal {
    userId: string;
    name: string;
}

export function getCookie(): CookieVal | undefined {
    const cookieStr = Cookies.get(USER_COOKIE);
    if (cookieStr) {
        const cookieData = JSON.parse(cookieStr);
        if (cookieData?.userId && cookieData?.name) {
            return cookieData;
        }
    }
}

function toDay(value: number) {
    return value / 60 / 60 / 24;
}

export function setCookie(val: CookieVal) {
    Cookies.set(USER_COOKIE, JSON.stringify(val), { expires: toDay(SESSION_EXPIRY) });
}

export function clearCookie() {
    Cookies.set(USER_COOKIE, JSON.stringify({}), { expires: toDay(SESSION_EXPIRY) });
}
