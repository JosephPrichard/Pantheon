/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Trim } from "class-sanitizer";
import { IsArray, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { MAX_LINK_LEN, MAX_POST_LEN, MAX_TITLE_LEN, MIN_POST_LEN } from "../../global";
import { NotificationEntity } from "../notifications/notification.entity";
import { PostEntity } from "./post.entity";

export class CreatePostDto {
    @IsString()
    @Trim()
    @MinLength(5, { message: "Title should be at least 5 characters."})
    @MaxLength(MAX_TITLE_LEN, { message: `Title should be less than ${MAX_TITLE_LEN} characters.`})
    title!: string;

    @IsString()
    forum!: string;

    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(MIN_POST_LEN, { message: `Text content must be at least ${MIN_POST_LEN} characters.`})
    @MaxLength(MAX_POST_LEN, { message: `Text content cannot exceed ${MAX_POST_LEN} characters.`})
    content?: string;

    @IsOptional()
    @IsString()
    @Trim()
    @IsUrl({}, { message: "Link should be a valid URL."})
    @MaxLength(MAX_LINK_LEN, { message: `Link should be less than ${MAX_LINK_LEN} characters.`})
    link?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];
}

export class UpdatePostDto {
    @IsString()
    @Trim()
    @MinLength(MIN_POST_LEN, { message: `Text content must be at least ${MIN_POST_LEN} characters.`})
    @MaxLength(MAX_POST_LEN, { message: `Text content cannot exceed ${MAX_POST_LEN} characters.`})
    content!: string;
}