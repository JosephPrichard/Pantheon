/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Type } from "class-transformer";
import { IsOptional, IsString, IsIn, IsNumber } from "class-validator";
import { TimeType } from "src/global";

export class FeedCursorDto {
    @IsOptional()
    @IsString()
    @IsIn(["day", "week", "month", "year", "alltime"])
    time?: TimeType;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    afterCursor?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    beforeCursor?: number;
}