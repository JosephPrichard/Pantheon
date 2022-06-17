/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserModule } from "../user/user.module";
import { NotificationService } from "./notification.service";
import { NotificationEntity } from "./notification.entity";
import { NotificationController } from "./notification.controller";

@Module({
    imports: [MikroOrmModule.forFeature([NotificationEntity]), UserModule],
    exports: [NotificationService],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}