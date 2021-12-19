import { Body, Controller, Delete, Get, Post, Put, Req, Res } from "@nestjs/common";
import { CreateSubDto, DeleteSubDto, UpdateSubDto } from "./subscription.dto";
import { SubscriptionService as SubscriptionService } from "./subscription.service";
import { Request, Response } from "express";
import { SESSION_ERROR } from "src/utils/global";

@Controller("subscriptions")
export class SubcriptionController {

    constructor(private readonly subService: SubscriptionService) {}

    @Post()
    async create(
        @Body() body: CreateSubDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const id = await this.subService.create(body, user);
        if (id) {
            res.json({ id });
        } else {
            res.status(405).end();
        }
    }

    @Get()
    async findAll(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const subscriptions = await this.subService.findByUser(user);
        res.json({ subscriptions });
    }

    @Put()
    async update(
        @Body() body: UpdateSubDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const subscription = await this.subService.update(body, user);
        if (subscription) {
            res.json({ subscription });
        } else {
            res.status(405).end();
        }
    }

    @Delete()
    async delete(
        @Body() body: DeleteSubDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const subscription = await this.subService.delete(body, user);
        if (subscription) {
            res.json({ subscription });
        } else {
            res.status(405).end();
        }
    }
}