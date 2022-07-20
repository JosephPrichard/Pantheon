/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { SubscriptionEntity } from "./subscription.entity";

export interface SubscriptionsRo {
    subscriptions: SubscriptionEntity[];
}

export interface SubscriptionRo {
    subscription: SubscriptionEntity;
}

export interface IsSubbedRo {
    isSubbed: boolean;
}