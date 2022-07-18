/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, FilterQuery, QueryOrder } from "mikro-orm";
import { NotificationEntity } from "./notification.entity";
import { User } from "../user/user.dto";
import { AppLogger } from "../../loggers/applogger";
import { CommentEntity } from "../comment/comment.entity";
import { UserEntity } from "../user/user.entity";
import { ResourcePermissionsException } from "../../exception/permissions.exception";
import { NotificationNotFound } from "../../exception/entityNotFound.exception";
import { NotificationFilterDto } from "./notification.dto";

@Injectable()
export class NotificationService {

    private readonly logger = new AppLogger(NotificationService.name);

    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: EntityRepository<NotificationEntity>
    ) {}

    async create(comment: CommentEntity, recipient: UserEntity) {
        const notificationEntity = new NotificationEntity();

        notificationEntity.comment = comment;
        notificationEntity.recipient = recipient;

        await this.notificationRepository.persistAndFlush(notificationEntity);

        this.logger.log(`User ${notificationEntity.recipient.id} notified about comment ${notificationEntity.comment.id}`);
        return notificationEntity;
    }

    async findByFilter(filter: NotificationFilterDto) {
        const where: FilterQuery<any> = { recipient: filter.recipient };

        // check if we should use cursors to paginate
        if (filter.afterCursor) {
            where.id = { $lt: filter.afterCursor };
        }

        // fetch notifications from repository
        const notifications = await this.notificationRepository.find(
            where,
            ["comment", "comment.commenter", "comment.post"],
            { id: QueryOrder.DESC },
            filter.perPage + 1
        );

        // remove the extra element from the list
        const nextPage = notifications.length >= filter.perPage + 1;
        if (nextPage) {
            notifications.pop();
        }

        return { notifications, nextPage };
    }

    async countUnread(user: User) {
        return await this.notificationRepository.count({ recipient: user.id, read: false });
    }

    async markAsRead(user: User, notificationId: number) {
        const notificationEntity = await this.notificationRepository.findOne({ id: notificationId });

        if (!notificationEntity) {
            throw new NotificationNotFound();
        }
        if (notificationEntity.recipient.id != user.id) {
            throw new ResourcePermissionsException();
        }

        notificationEntity.read = true;

        await this.notificationRepository.flush();

        this.logger.log(`Notification ${notificationEntity.id} was marked read`);
        return notificationEntity;
    }

    async markAllAsRead(user: User) {
        const count = await this.notificationRepository.nativeUpdate({ recipient: user.id }, { read: true });
        this.logger.log(`User ${user.id} marked all notifications as read`);
        return count;
    }

    async deleteByComment(comment: CommentEntity) {
        return await this.notificationRepository.nativeDelete({ comment: comment });
    }
}