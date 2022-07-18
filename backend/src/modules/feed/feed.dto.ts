/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString } from "class-validator";
import { PostEntity } from "../post/post.entity";
import { CommentEntity } from "../comment/comment.entity";

export class FeedCursorDto {
    @IsOptional()
    @IsString()
    @Type(() => String)
    user?: string;

    @IsOptional()
    @IsString()
    @Type(() => String)
    forum?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    afterCursor?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    beforeCursor?: number;
}

export class HomeFeedCursorDto {
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

export interface ActivityDto {
    isPost: boolean;
    activity: PostEntity | CommentEntity;
}