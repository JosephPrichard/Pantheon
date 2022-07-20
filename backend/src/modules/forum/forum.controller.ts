/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Param } from "@nestjs/common";
import { FindForumsDto } from "./forum.dto";
import { ForumService } from "./forum.service";
import { ForumNotFoundException } from "src/exception/entityNotFound.exception";
import { ForumRo, ForumsRo } from "./forum.interface";

@Controller("forums")
export class ForumController {

    constructor(private readonly forumService: ForumService) {}
    
    @Get()
    async getForums(@Param() params: FindForumsDto): Promise<ForumsRo> {
        const forums = await this.forumService.findForums(params.limit);
        return { forums };
    }

    @Get("/:id")
    async getById(@Param("id") idParam: string): Promise<ForumRo> {
        const forum = await this.forumService.findById(idParam);
        if (!forum) {
            throw new ForumNotFoundException();
        }
        return { forum };
    }
}