/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Type } from "class-transformer";
import { IsString, IsIn, MaxLength, IsOptional, IsNumber } from "class-validator";
import { MAX_ST_LEN, TimeType } from "src/global";

export class SearchPostsDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    cursor?: number;

    @IsString()
    @MaxLength(MAX_ST_LEN, { message: `Search text length cannot exceed ${MAX_ST_LEN}` })
    text!: string;

    @IsOptional()
    @IsString()
    @IsIn(["day", "week", "month", "year", "alltime"])
    time?: TimeType;

    @IsOptional()
    @IsString()
    forum?: string;

    @IsOptional()
    @IsString()
    poster?: string;
}

export interface SearchPostFilter {
    cursor?: number;
    text: string;
    date?: Date;
    poster?: string;
    forum?: string;
}

export interface PostSearchRow {
    id: string;
    posterId: string | null;
    forumId: string;
    title: string;
    votes: number;
    comments: number;
    content: string | null;
    images: string[];
    link: string | null;
    createdAt: string;
    count: number;
    posterName: string;
    searchRank: string;
}

export interface SearchedPost {
    id: number;
    poster: null | {
        id: number;
        name: string;
    }
    forum: {
        id: string;
    }
    title: string;
    votes: number;
    comments: number;
    content: string | null;
    images: string[];
    link: string | null;
    createdAt: string;

    searchRank: number;
}