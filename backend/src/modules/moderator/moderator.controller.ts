import { Body, Controller, Delete, Get, Param, Post, Req, Res } from "@nestjs/common";
import { CreateModeratorDto, DeleteModeratorDto } from "./moderator.dto";
import { ModeratorService } from "./moderator.service";
import { Request } from "express";
import { InvalidSessionException } from "src/exception/session.exception";

@Controller("moderators")
export class ModeratorController {

    constructor(private readonly modService: ModeratorService) {}

    @Post()
    async create(
        @Body() body: CreateModeratorDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const moderator = await this.modService.appointMod(body, user);
        return { moderator };
    }

    @Get()
    async getByUser(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const moderators = await this.modService.findByUser(user);
        return { moderators };
    }

    @Get("/:forum")
    async getByForum(
        @Param("forum") forumParam: string
    ) {
        const moderators = await this.modService.findByForum(forumParam);
        return { moderators };
    }

    @Delete()
    async delete(
        @Body() body: DeleteModeratorDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const moderator = await this.modService.removeMod(body, user);
        return { moderator };
    }
}