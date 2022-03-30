/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { UserEntity } from "./user";

export interface ForumEntity {
    id: string;
    owner: UserEntity;
    subscriptions: number;
    title: string;
    description: string;
    createdAt: string;
}