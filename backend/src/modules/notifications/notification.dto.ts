/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { NotificationEntity } from "./notification.entity";

export class MarkNotificationDto {
    @IsNumber()
    id!: number;
}

export class NotificationCursorDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    afterCursor?: number;
}