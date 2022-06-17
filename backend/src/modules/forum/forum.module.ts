/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { ForumController } from "./forum.controller";
import { ForumEntity } from "./forum.entity";
import { ForumService } from "./forum.service";

@Module({
    imports: [MikroOrmModule.forFeature([ForumEntity]), UserModule],
    exports: [ForumService],
    controllers: [ForumController],
    providers: [ForumService],
})
export class ForumModule {}