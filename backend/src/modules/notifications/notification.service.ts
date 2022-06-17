/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, QueryOrder } from "mikro-orm";
import { NotificationEntity } from "./notification.entity";
import { User } from "../user/user.dto";
import { AppLogger } from "../../loggers/applogger";
import { CommentEntity } from "../comment/comment.entity";
import { UserEntity } from "../user/user.entity";
import { ResourcePermissionsException } from "../../exception/permissions.exception";
import { NotificationNotFound } from "../../exception/entityNotFound.exception";

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

    async findByUser(user: User) {
        return await this.notificationRepository.find(
            { recipient: user.id },
            ["comment", "comment.commenter", "comment.post"],
            { id: QueryOrder.DESC }
        );
    }

    async countUnread(user: User) {
        return await this.notificationRepository.count({ recipient: user.id, read: false });
    }

    async markAsRead(user: User, notification: number) {
        const notificationEntity = await this.notificationRepository.findOne({ id: notification });

        if (!notificationEntity) {
            throw new NotificationNotFound();
        }

        if (notificationEntity.recipient.id != user.id) {
            throw new ResourcePermissionsException();
        }

        notificationEntity.read = true;

        await this.notificationRepository.flush();

        return notificationEntity;
    }

    async markAllAsRead(user: User) {
        return await this.notificationRepository.nativeUpdate({ recipient: user.id }, { read: true });
    }
}