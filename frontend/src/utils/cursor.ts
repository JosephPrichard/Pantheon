/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../client/models/post";
import { ActivityEntity } from "../client/models/activity";
import { NotificationEntity } from "../client/models/notification";

export function getAfterCursor(posts?: PostEntity[]) {
    if (posts && posts.length > 0) {
        return posts[posts.length - 1].id;
    }
}

export function getBeforeCursor(posts?: PostEntity[]) {
    if (posts && posts.length > 0) {
        return posts[0].id;
    }
}

export function findActivityCursor(activities: ActivityEntity[], isPost: boolean) {
    for (let i = activities.length - 1; i >= 0; i--) {
        if (activities[i].isPost == isPost) {
            return activities[i].activity.id;
        }
    }
}

export function findNotificationsCursor(notifications: NotificationEntity[]) {
    if (notifications.length > 0) {
        return notifications[notifications.length - 1].id;
    }
}
