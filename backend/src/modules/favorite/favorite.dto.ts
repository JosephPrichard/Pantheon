/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsNumber } from "class-validator";

export class CreateFavoriteDto {
    @IsNumber()
    post!: number;
}