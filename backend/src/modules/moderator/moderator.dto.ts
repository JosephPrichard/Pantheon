/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsNumber, IsString } from "class-validator";

export class CreateModeratorDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}

export class DeleteModeratorDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}