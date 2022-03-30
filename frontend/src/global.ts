/*
 * Copyright (c) Joseph Prichard 2022.
 */

export const SESSION_EXPIRY =  86_400; // in seconds

export type SortType = "top" | "new" | "hot";
export const sortTypes = ["top", "new", "hot"];
export type TimeType = "day" | "week" | "month" | "year" | "alltime";
export const timeTypes = ["day", "week", "month", "year", "alltime"];
export const ALLTIME: TimeType = "alltime";

export const PUBLIC_CLOUD_URL = "https://storage.googleapis.com/pantheon-forum-bucket";
