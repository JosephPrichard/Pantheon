import { ForumEntity } from "../../client/models/forum";
import { ModeratorEntity } from "../../client/models/moderator";
import { SubscriptionEntity } from "../../client/models/subscription";
import axios from "axios";
import { config } from "../../client/config";

export interface TopForumsRes {
    forums: ForumEntity[];
}

export interface Submission {
    name: string;
    description?: string;
}

export interface ForumRes {
    id: string;
}

export function createForum(body: Submission) {
    if (body.description === "") {
        body.description = undefined;
    }
    return axios.post<ForumRes>("/api/forums", body, config);
}