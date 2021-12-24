import { Body, Controller, Delete, Get, Param, Post, Req, Res } from "@nestjs/common";
import { CreateFavoriteDto } from "./favorite.dto";
import { FavoriteService } from "./favorite.service";
import { Request } from "express";
import { InvalidSessionException } from "src/exception/session.exception";

@Controller("favorites")
export class FavoriteController {

    constructor(private readonly favoriteService: FavoriteService) {}

    @Post()
    async create(
        @Body() body: CreateFavoriteDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const favorite = await this.favoriteService.create(body, user);
        return { favorite };
    }

    @Get()
    async getAll(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const favorites = await this.favoriteService.findByUser(user);
        return { favorites };
    }

    @Delete("/:id")
    async delete(
        @Param() idParam: string,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const favorite = await this.favoriteService.delete(idParam, user)
        return { favorite };
    }
}