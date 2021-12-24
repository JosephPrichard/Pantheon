import { Body, Controller, Delete, Get, Post, Put, Req, Res } from "@nestjs/common";
import { CreateSubDto, DeleteSubDto, UpdateSubDto } from "./subscription.dto";
import { SubscriptionService as SubscriptionService } from "./subscription.service";
import { Request } from "express";
import { InvalidSessionException } from "src/exception/session.exception";

@Controller("subscriptions")
export class SubcriptionController {

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

        const id = await this.subService.create(body, user);
        return { id };
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
        @Body() body: DeleteSubDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const subscription = await this.subService.delete(body, user);
        return { subscription };
    }
}