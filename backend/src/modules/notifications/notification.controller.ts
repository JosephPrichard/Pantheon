/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Request } from "express";
import { InvalidSessionException } from "../../exception/session.exception";

@Controller("notifications")
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {}

    @Post("/mark/:id")
    async markRead(
        @Req() req: Request,
        @Param() idParam: number
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const notifications = await this.notificationService.markAsRead(user, idParam);
        return { notifications };
    }

    @Post("/mark")
    async markAllRead(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const count = await this.notificationService.markAllAsRead(user);
        return { count };
    }

    @Get()
    async getNotifications(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const notifications = await this.notificationService.findByUser(user);
        return { notifications };
    }

    @Get("/unread")
    async getUnreadCount(
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const count = await this.notificationService.countUnread(user);
        return { count };
    }
}