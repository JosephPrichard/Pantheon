/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Type } from "class-transformer";
import { IsOptional, IsNumber } from "class-validator";
import { PostEntity } from "../post/post.entity";
import { CommentEntity } from "../comment/comment.entity";

export class FeedCursorDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    afterCursor?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    beforeCursor?: number;
}

export class ActivityFeedCursorDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    commentsAfterCursor?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    postsAfterCursor?: number;
}

export interface ActivityElement {
    isPost: boolean;
    activity: PostEntity | CommentEntity;
}