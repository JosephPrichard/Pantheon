/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Body, Controller, NotFoundException, Post, Req } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { CommentService } from "../comment/comment.service";
import { UserService } from "../user/user.service";
import { Request } from "express";
import { InvalidSessionException } from "../../exception/session.exception";
import { DeleteAccountDto } from "./account.dto";
import { DeleteAccountRo } from "./account.interface";

@Controller("accounts")
export class AccountController {

    constructor(
        private readonly userService: UserService,

        private readonly postService: PostService,

        private readonly commentService: CommentService,
    ) {}

    @Post("/deactivate")
    async deleteAccount(@Body() body: DeleteAccountDto, @Req() req: Request): Promise<DeleteAccountRo> {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const loginUser = await this.userService.findByLogin(user.name, body.password);
        if (!loginUser) {
            throw new NotFoundException("Incorrect login information.");
        }

        req.session.user = undefined;

        const [userCount, postCount, commentCount] = await Promise.all([
            this.userService.delete(user),
            this.postService.deleteAll(user),
            this.commentService.deleteAll(user)
        ]);

        return {
            userCount,
            postCount,
            commentCount
        }
    }
}