/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NotificationEntity } from "./notification.entity";

export interface NotificationFilter {
    afterCursor? : number;
    recipient: number;
    perPage: number;
}

export interface NotificationFilterRo {
    notifications: NotificationEntity[];
    nextPage: boolean;
}

export interface NotificationsRo {
    notifications: NotificationEntity[];
}

export interface NotificationRo {
    notification: NotificationEntity;
}

export interface CountRo {
    count: number;
}
