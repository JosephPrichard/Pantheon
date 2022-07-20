/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsBoolean, IsString } from "class-validator";
import { SubscriptionEntity } from "./subscription.entity";

export class CreateSubDto {
    @IsString()
    forum!: string;
}

export class UpdateSubDto {
    @IsString()
    forum!: string;

    @IsBoolean()
    isFavorite!: boolean;
}

export class DeleteSubDto {
    @IsString()
    forum!: string;
}