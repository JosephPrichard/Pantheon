/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Type } from "class-transformer";
import { IsOptional, IsString, IsIn, IsInt, Max } from "class-validator";
import { MAX_PAGE, SortType, TimeType } from "src/global";

export class FeedDto {
    @IsOptional()
    @IsString()
    @IsIn(["day", "week", "month", "year", "alltime"])
    time?: TimeType;

    @IsInt()
    @Type(() => Number)
    @Max(MAX_PAGE, { message: `Page number cannot exceed ${MAX_PAGE}`})
    page!: number;

    @IsString()
    @IsIn(["new", "top", "hot"])
    sort!: SortType;
}

export class PageDto {
    @IsInt()
    @Type(() => Number)
    page!: number;
}