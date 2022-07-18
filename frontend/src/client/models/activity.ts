/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "./post";
import { CommentEntity } from "./comment";

export interface ActivityEntity {
    isPost: boolean;
    activity: PostEntity | CommentEntity;
}