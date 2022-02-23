import { Body, Controller, Delete, Get, Post, Put, Query, Req } from "@nestjs/common";
import { CreateSubDto, DeleteSubDto, UpdateSubDto } from "./subscription.dto";
import { SubscriptionService as SubscriptionService } from "./subscription.service";
import { Request } from "express";
import { InvalidSessionException } from "src/exception/session.exception";

@Controller("subscriptions")
export class SubscriptionController {

    constructor(private readonly subService: SubscriptionService) {}

    @Post()
    async create(
        @Body() body: CreateSubDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const subscription = await this.subService.create(body, user);
        return { subscription };
    }

    @Get()
    async findAll(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const subscriptions = await this.subService.findByUser(user);
        return { subscriptions };
    }

    @Get("/isSubbed")
    async isSubbed(
        @Query("forum") forum: string,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            return new InvalidSessionException();
        }

        const isSubbed = await this.subService.isSubbed(user, forum);
        return { isSubbed };
    }

    @Put()
    async update(
        @Body() body: UpdateSubDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const subscription = await this.subService.update(body, user);
        return { subscription };
    }

    @Delete()
    async delete(
        @Query() query: DeleteSubDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const subscription = await this.subService.delete(query, user);
        return { subscription };
    }
}