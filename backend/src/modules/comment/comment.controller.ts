/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Request } from "express";
import { sanitize } from "class-sanitizer";
import { sanitizeString } from "../../utils/sanitize.util";
import { CreateCommentNodeDto, CreateCommentRootDto, UpdateCommentDto } from "./comment.dto";
import { InvalidSessionException } from "src/exception/session.exception";
import { CommentNotFoundException } from "src/exception/entityNotFound.exception";

@Controller("comments")
export class CommentController {

    constructor(private readonly commentService: CommentService) {}

    @Post("/nodes")
    async createNode(
        @Body() body: CreateCommentNodeDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
           throw new InvalidSessionException();
        }

        body.content = sanitizeString(body.content);

        const comment = await this.commentService.createNode(body, user);
        return { comment };
    }

    @Post("/roots")
    async createRoot(
        @Body() body: CreateCommentRootDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        body.content = sanitizeString(body.content);

        const comment = await this.commentService.createRoot(body, user);
        return { comment };
    }

    @Get("/:id")
    async getById(
        @Param("id") idParam: number
    ) {
        const comment = await this.commentService.findById(idParam);
        if (!comment) {
            throw new CommentNotFoundException();
        }
        return { comment };
    }

    @Put("/:id")
    async update(
        @Body() body: UpdateCommentDto, 
        @Param("id") idParam: number,
        @Req() req: Request
    ) {
        sanitize(body);
        body.content = sanitizeString(body.content);

        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const comment = await this.commentService.update(body, idParam, user);
        return { comment };
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

        const comment = await this.commentService.delete(idParam, user);
        return { comment };
    }
}
