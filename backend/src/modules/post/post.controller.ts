/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { sanitize } from "class-sanitizer";
import { CreatePostDto, UpdatePostDto } from "./post.dto";
import { PostService } from "./post.service";
import { Request } from "express";
import { sanitizeString } from "../../utils/sanitize.utils";
import { InvalidSessionException } from "src/exception/session.exception";
import { PostNotFoundException } from "src/exception/entityNotFound.exception";

@Controller("posts")
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Post()
    async create(
        @Body() body: CreatePostDto, 
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        sanitize(body);
        if (body.content) {
            body.content = sanitizeString(body.content);
        }

        const post = await this.postService.create(body, user);
        return { post };
    }

    @Get("/:id")
    async getById(
        @Param("id") idParam: number
    ) {
        const post = await this.postService.findById(idParam);
        if (!post) {
            throw new PostNotFoundException();
        }
        return { post };
    }

    @Put("/:id")
    async update(
        @Body() body: UpdatePostDto, 
        @Param("id") idParam: number,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        sanitize(body);
        if (body.content) {
            body.content = sanitizeString(body.content);
        }

        const post = await this.postService.update(body, idParam, user);
        return { post };
    }

    @Delete("/:id")
    async delete(
        @Param("id") idParam: number,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const post = await this.postService.delete(idParam, user);
        return { post };
    }
}