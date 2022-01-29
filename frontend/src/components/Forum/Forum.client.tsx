import { ForumEntity } from "../../client/models/forum";
import { ModeratorEntity } from "../../client/models/moderator";
import { SubscribtionEntity } from "../../client/models/subscription";
import axios from "axios";
import { config } from "../../client/config";

export interface TopForumsRes {
    forums: ForumEntity[];
}

export interface SubsRes {
    subscriptions: SubscribtionEntity[];
}

export interface ModsRes {
    moderators: ModeratorEntity[];
}

export interface Submission {
    name: string;
    description?: string;
}

export interface ForumRes {
    id: string;
}

export function createForum(body: Submission) {
    console.log(body);
    if (body.description === "") {
        body.description = undefined;
    }
    return axios.post<ForumRes>("/api/forums", body, config);
}