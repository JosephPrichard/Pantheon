/*
 * Copyright (c) Joseph Prichard 2022.
 */

import Cookies from "js-cookie";
import { SESSION_EXPIRY } from "./session";
import { User } from "../client/hooks/creds";

export const USER_COOKIE = "USER";

export function getUser(): User | undefined {
    const cookieStr = Cookies.get(USER_COOKIE);
    if (cookieStr) {
        const cookieData = JSON.parse(cookieStr);
        if (cookieData?.id && cookieData?.name) {
            return cookieData;
        }
    }
}

function toDay(value: number) {
    return value / 60 / 60 / 24;
}

export function setUser(val: User) {
    Cookies.set(USER_COOKIE, JSON.stringify(val), { expires: toDay(SESSION_EXPIRY) });
}

export function clearUser() {
    Cookies.set(USER_COOKIE, JSON.stringify({}), { expires: toDay(SESSION_EXPIRY) });
}
