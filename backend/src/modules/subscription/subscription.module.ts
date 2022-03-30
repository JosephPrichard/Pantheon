/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ForumModule } from "../forum/forum.module";
import { UserModule } from "../user/user.module";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionEntity } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";

@Module({
    imports: [MikroOrmModule.forFeature([SubscriptionEntity]), ForumModule, UserModule],
    exports: [SubscriptionService],
    controllers: [SubscriptionController],
    providers: [SubscriptionService]
})
export class SubscriptionModule {}