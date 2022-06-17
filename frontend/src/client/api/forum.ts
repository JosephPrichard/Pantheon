/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ForumEntity } from "../models/forum";
import { ModeratorEntity } from "../models/moderator";
import { SubscriptionEntity } from "../models/subscription";
import axios from "axios";
import { config } from "../config";

export interface ForumsRes {
    forums: ForumEntity[];
}

export function buildFetchForumsUrl(limit?: number) {
    if (limit) {
        return `/api/forums?limit=${limit}`;
    } else {
        return "/api/forums";
    }
}