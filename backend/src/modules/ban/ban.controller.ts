/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Body, Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { BanService } from "./ban.service";
import { Request } from "express";
import { CreateBanDto, DeleteBanDto } from "./ban.dto";
import { InvalidSessionException } from "src/exception/session.exception";

@Controller("bans")
export class BanController {

    constructor(private readonly banService: BanService) {}

    @Post()
    async ban(
        @Body() body: CreateBanDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const ban = await this.banService.ban(body, user);
        return { ban };
    }

    @Get("/banned")
    async getAllBanning(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const bans = await this.banService.findBansByBanning(user);
        return { bans };
    }

    @Get("/banning")
    async getAllBanned(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const bans = await this.banService.findBansByBanned(user);
        return { bans };
    }

    @Delete()
    async unban(
        @Body() body: DeleteBanDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const ban = await this.banService.unban(body, user);
        return { ban };
    }

}