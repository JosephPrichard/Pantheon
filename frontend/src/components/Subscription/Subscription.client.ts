/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { SubscriptionEntity } from "../../client/models/subscription";
import axios from "axios";
import { config } from "../../client/config";
import { PostRes } from "../Submit/Submit.client";

export interface IsSubbedRes {
    isSubbed: boolean;
}

export interface SubsRes {
    subscriptions: SubscriptionEntity[];
}

export interface Subscription {
    forum: string;
}

export function createSubscription(body: Subscription) {
    return axios.post<PostRes>("/api/subscriptions", body, config);
}

export function deleteSubscription(body: Subscription) {
    return axios.delete<PostRes>(`/api/subscriptions?forum=${body.forum}`, config);
}