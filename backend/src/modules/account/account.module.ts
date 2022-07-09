/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Module } from "@nestjs/common";
import { PostModule } from "../post/post.module";
import { CommentModule } from "../comment/comment.module";
import { UserModule } from "../user/user.module";
import { AccountController } from "./account.controller";

@Module({
    imports: [UserModule, PostModule, CommentModule],
    controllers: [AccountController],
})
export class AccountModule {}