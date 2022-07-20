/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsInt, IsOptional } from "class-validator";
import { ForumEntity } from "./forum.entity";

export class FindForumsDto {
    @IsOptional()
    @IsInt()
    limit?: number;
}