/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Body, Controller, Get, Param, Put, Req } from "@nestjs/common";
import { FindForumsDto, UpdateForumDto } from "./forum.dto";
import { ForumService } from "./forum.service";
import { Request } from "express";
import { sanitize } from "class-sanitizer";
import { sanitizeString } from "src/utils/sanitize.utils";
import { InvalidSessionException } from "src/exception/session.exception";
import { ForumNotFoundException } from "src/exception/entityNotFound.exception";

@Controller("forums")
export class ForumController {

    constructor(private readonly forumService: ForumService) {}
    
    @Get()
    async getForums(
        @Param() params: FindForumsDto
    ) {
        const forums = await this.forumService.findForums(params.limit);
        return { forums };
    }

    @Get("/:id")
    async getById(
        @Param("id") idParam: string
    ) {
        const forum = await this.forumService.findById(idParam);
        if (!forum) {
            throw new ForumNotFoundException();
        }
        return { forum };
    }

    @Put("/:id")
    async update(
        @Body() body: UpdateForumDto,
        @Param("id") idParam: string,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        sanitize(body);
        if (body.description) {
            body.description = sanitizeString(body.description);
        }

        const forum = await this.forumService.update(body, idParam, user);
        return { forum };
    }
}