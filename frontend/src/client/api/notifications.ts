/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NotificationEntity } from "../models/notification";
import axios from "axios";
import { config } from "../config";

export interface UnreadCountRes {
    count: number;
}

export interface NotificationsRes {
    notifications: NotificationEntity[]
}

export function markAllAsRead() {
    return axios.post<{ count: number }>("/api/notifications/mark", {}, config);
}