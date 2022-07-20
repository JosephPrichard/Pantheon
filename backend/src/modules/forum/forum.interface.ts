/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ForumEntity } from "./forum.entity";

export interface ForumsRo {
    forums: ForumEntity[];
}

export interface ForumRo {
    forum: ForumEntity;
}