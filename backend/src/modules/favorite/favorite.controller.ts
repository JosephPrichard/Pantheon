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

        const favorite = await this.favoriteService.favorite(body, user);
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

    @Delete("/:post")
    async delete(
        @Param("post") postParam: string,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const favorite = await this.favoriteService.unfavorite(postParam, user)
        return { favorite };
    }
}