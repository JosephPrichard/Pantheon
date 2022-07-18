/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NotificationEntity } from "../models/notification";
import axios from "axios";
import { config } from "../config";
import { ActivityRes } from "./feed";

export interface UnreadCountRes {
    count: number;
}

export interface NotificationsRes {
    notifications: NotificationEntity[];
    nextPage: boolean;
}

export interface NotificationRes {
    notification: NotificationEntity;
}

export function markAllAsRead() {
    return axios.post<{ count: number }>("/api/notifications/markAll", {}, config);
}

export function markAsRead(id: number) {
    return axios.post<NotificationRes>(`/api/notifications/mark`, { id }, config);
}

export function fetchNotifications(afterCursor: number) {
    console.log(`/api/notifications?afterCursor=${afterCursor}`);
    return axios.get<NotificationsRes>(`/api/notifications?afterCursor=${afterCursor}`, config);
}