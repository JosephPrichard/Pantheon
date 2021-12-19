import { Body, Controller, Delete, Get, Param, Post, Req, Res } from "@nestjs/common";
import { CreateFavoriteDto } from "./favorite.dto";
import { FavoriteService } from "./favorite.service";
import { Request, Response } from "express";
import { SESSION_ERROR } from "../../utils/global";

@Controller("favorites")
export class FavoriteController {

    constructor(private readonly favoriteService: FavoriteService) {}

    @Post()
    async create(
        @Body() body: CreateFavoriteDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const favorite = await this.favoriteService.create(body, user);
        if (favorite) {
            res.json({ favorite });
        } else {
            res.status(405).end();
        }
    }

    @Get()
    async getAll(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const favorites = await this.favoriteService.findByUser(user);
        res.json({ favorites });
    }

    @Delete("/:id")
    async delete(
        @Param() idParam: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const favorite = await this.favoriteService.delete(idParam, user)
        if (favorite) {
            res.json({ favorite });
        } else {
            res.status(404).end();
        }
    }
}