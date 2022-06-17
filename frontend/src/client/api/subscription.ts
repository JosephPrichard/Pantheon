/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { SubscriptionEntity } from "../models/subscription";
import axios from "axios";
import { config } from "../config";
import { PostRes } from "./submit";

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