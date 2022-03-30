/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ForumEntity } from "./forum";
import { UserEntity } from "./user";

export interface ModeratorEntity {
    forum: ForumEntity;
    user: UserEntity;
}
