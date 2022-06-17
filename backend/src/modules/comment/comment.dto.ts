/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Trim } from "class-sanitizer";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { MAX_COMMENT_LEN, MIN_COMMENT_LEN } from "../../global";

export class CreateCommentNodeDto {
    @IsNumber()
    parentComment!: number;

    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(MIN_COMMENT_LEN, { message: `Text content must be at least ${MIN_COMMENT_LEN} characters.`})
    @MaxLength(MAX_COMMENT_LEN, { message: `Text content cannot exceed ${MAX_COMMENT_LEN} characters.`})
    content!: string;
}

export class CreateCommentRootDto {
    @IsNumber()
    post!: number;

    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(MIN_COMMENT_LEN, { message: `Text content must be at least ${MIN_COMMENT_LEN} characters.`})
    @MaxLength(MAX_COMMENT_LEN, { message: `Text content cannot exceed ${MAX_COMMENT_LEN} characters.`})
    content!: string;
}

export class UpdateCommentDto {
    @IsString()
    @Trim()
    @MinLength(MIN_COMMENT_LEN, { message: `Text content must be at least ${MIN_COMMENT_LEN} characters.`})
    @MaxLength(MAX_COMMENT_LEN, { message: `Text content cannot exceed ${MAX_COMMENT_LEN} characters.`})
    content!: string;
}

export interface CommentTreeDto {
    post: number;
}
