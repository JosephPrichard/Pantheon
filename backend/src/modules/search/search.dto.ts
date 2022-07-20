/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsString, MaxLength, IsOptional, IsNumber } from "class-validator";
import { MAX_ST_LEN } from "src/global";
import { PostVoteEntity } from "../vote/vote.entity";

export class SearchPostsDto {
    @IsOptional()
    @IsNumber()
    cursor?: number;

    @IsString()
    @MaxLength(MAX_ST_LEN, { message: `Search text length cannot exceed ${MAX_ST_LEN}` })
    text!: string;

    @IsOptional()
    @IsString()
    forum?: string;

    @IsOptional()
    @IsString()
    poster?: string;
}