/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../types";
import { CommentNotificationEntity } from "./comment";

export interface NotificationEntity {
    id: Id;
    recipient: Id;
    comment: CommentNotificationEntity;
    read: boolean;
}