/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Request } from "express";
import { InvalidSessionException } from "../../exception/session.exception";
import { MarkNotificationDto, NotificationCursorDto, NotificationFilterDto } from "./notification.dto";
import { PER_PAGE } from "../../global";

@Controller("notifications")
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {}

    @Post("/mark")
    async markRead(
        @Req() req: Request,
        @Body() body: MarkNotificationDto
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const notification = await this.notificationService.markAsRead(user, body.id);
        return { notification };
    }

    @Post("/markAll")
    async markAllRead(@Req() req: Request) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const count = await this.notificationService.markAllAsRead(user);
        return { count };
    }

    @Get()
    async getNotifications(
        @Query() query: NotificationCursorDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const filter: NotificationFilterDto = {
            recipient: user.id,
            afterCursor:query.afterCursor,
            perPage: PER_PAGE
        };

        return await this.notificationService.findByFilter(filter);
    }

    @Get("/unread")
    async getUnreadCount(@Req() req: Request) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const count = await this.notificationService.countUnread(user);
        return { count };
    }
}