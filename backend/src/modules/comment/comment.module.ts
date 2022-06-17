/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { PostModule } from "../post/post.module";
import { UserModule } from "../user/user.module";
import { CommentController } from "./comment.controller";
import { CommentEntity } from "./comment.entity";
import { CommentService } from "./comment.service";
import { NotificationModule } from "../notifications/notification.module";

@Module({
    imports: [
        MikroOrmModule.forFeature([CommentEntity]),
        NotificationModule,
        PostModule, 
        UserModule
    ],
    exports: [CommentService],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}