/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsString } from "class-validator";

export class DeleteAccountDto {
    @IsString()
    password!: string;
}