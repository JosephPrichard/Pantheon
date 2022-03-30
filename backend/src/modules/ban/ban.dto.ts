/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsNumber, IsString } from "class-validator";

export class CreateBanDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}

export class DeleteBanDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}