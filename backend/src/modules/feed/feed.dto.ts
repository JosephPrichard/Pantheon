/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString } from "class-validator";

export class FeedDto {
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

export class HomeFeedDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    afterCursor?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    beforeCursor?: number;
}

export class ActivityFeedDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    commentsAfterCursor?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    postsAfterCursor?: number;

    @IsOptional()
    @IsString()
    @Type(() => String)
    user!: string;
}