import { Type } from "class-transformer";
import { IsInt, Max, IsString, IsIn, MaxLength, IsOptional } from "class-validator";
import { MAX_PAGE, MAX_ST_LEN, TimeType } from "src/global";

export class SearchPostsDto {
    @IsInt()
    @Type(() => Number)
    @Max(MAX_PAGE, { message: `Page number cannot exceed ${MAX_PAGE}`})
    page!: number;

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

export class SearchDto {
    @IsInt()
    @Type(() => Number)
    @Max(MAX_PAGE, { message: `Page number cannot exceed ${MAX_PAGE}`})
    page!: number;

    @IsString()
    @MaxLength(MAX_ST_LEN, { message: `Search text length cannot exceed ${MAX_ST_LEN}` })
    text!: string;
}

export interface SearchPostFilter {
    page: number;
    text: string;
    date?: Date;
    poster?: string;
    forum?: string;
}

export interface SearchFilter {
    page: number;
    text: string;
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
    titleHeadline: string;
    contentHeadline: string;
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

    titleHeadline: string;
    contentHeadline: string;
    searchRank: number;
}