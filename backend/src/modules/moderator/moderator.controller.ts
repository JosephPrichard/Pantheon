import { Body, Controller, Delete, Get, Param, Post, Req, Res } from "@nestjs/common";
import { SESSION_ERROR } from "src/utils/global";
import { CreateModeratorDto, DeleteModeratorDto } from "./moderator.dto";
import { ModeratorService } from "./moderator.service";
import { Request, Response } from "express";

@Controller("moderators")
export class ModeratorController {

    constructor(private readonly modService: ModeratorService) {}

    @Post()
    async create(
        @Body() body: CreateModeratorDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const moderator = await this.modService.create(body, user);
        if (moderator) {
            res.json({ moderator });
        } else {
            res.status(405).end();
        }
    }

    @Get()
    async getByUser(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const moderators = await this.modService.findByUser(user);
        res.json({ moderators });
    }

    @Get("/:circle")
    async getByCircle(
        @Param("circle") circleParam: string,
        @Res() res: Response
    ) {
        const moderators = await this.modService.findByCircle(circleParam);
        res.json({ moderators });
    }

    @Delete()
    async delete(
        @Body() body: DeleteModeratorDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const moderator = await this.modService.delete(body, user);
        if (moderator) {
            res.json({ moderator });
        } else {
            res.status(404).end();
        }
    }
}