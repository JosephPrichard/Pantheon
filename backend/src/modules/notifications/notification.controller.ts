/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Request } from "express";
import { InvalidSessionException } from "../../exception/session.exception";
import { MarkNotificationDto, NotificationCursorDto, } from "./notification.dto";
import { PER_PAGE } from "../../global";
import { CountRo, NotificationFilter, NotificationRo, NotificationsRo } from "./notification.interface";

@Controller("notifications")
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {}

    @Post("/mark")
    async markRead(@Body() body: MarkNotificationDto, @Req() req: Request): Promise<NotificationRo> {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const notification = await this.notificationService.markAsRead(user, body.id);
        return { notification };
    }

    @Post("/markAll")
    async markAllRead(@Req() req: Request): Promise<CountRo> {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const count = await this.notificationService.markAllAsRead(user);
        return { count };
    }

    @Get()
    async getNotifications(@Query() query: NotificationCursorDto, @Req() req: Request): Promise<NotificationsRo> {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const filter: NotificationFilter = {
            recipient: user.id,
            afterCursor:query.afterCursor,
            perPage: PER_PAGE
        };

        return await this.notificationService.findByFilter(filter);
    }

    @Get("/unread")
    async getUnreadCount(@Req() req: Request): Promise<CountRo> {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const count = await this.notificationService.countUnread(user);
        return { count };
    }
}