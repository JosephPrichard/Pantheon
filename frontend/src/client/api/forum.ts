/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ForumEntity } from "../models/forum";
import { ModeratorEntity } from "../models/moderator";
import { SubscriptionEntity } from "../models/subscription";
import axios from "axios";
import { config, configNoCreds } from "../config";

export interface ForumsRes {
    forums: ForumEntity[];
}

export interface ForumRes {
    forum: ForumEntity;
}

export async function fetchForumById(id: string) {
    return await axios.get<ForumRes>(`/api/forums/${id}`, configNoCreds);
}

export function buildFetchForumsUrl(limit?: number) {
    if (limit) {
        return `/api/forums?limit=${limit}`;
    } else {
        return "/api/forums";
    }
}
