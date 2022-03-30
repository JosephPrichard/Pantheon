/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository, expr, QueryOrder } from "mikro-orm";
import { EntityManager } from "@mikro-orm/postgresql";
import { ForumNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateForumException } from "src/exception/invalidInput.exception";
import { ModPermissionsException } from "src/exception/permissions.exception";
import { AppLogger } from "src/loggers/applogger";
import { PermissionsService } from "../permissions/permissions.service";
import { User } from "../user/user.dto";
import { CreateForumDto, UpdateForumDto } from "./forum.dto";
import { ForumEntity } from "./forum.entity";

@Injectable()
export class ForumService {

    private readonly logger = new AppLogger(ForumService.name);

    constructor(
        private readonly em: EntityManager,

        @InjectRepository(ForumEntity) 
        private readonly forumRepository: EntityRepository<ForumEntity>,

        private readonly permsService: PermissionsService
    ) {}

    async create(forum: CreateForumDto, owner: User) {
        const oldForumEntity = await this.findByIdCase(forum.name);
        if (oldForumEntity) {
            throw new DuplicateForumException(forum.name);
        }

        const forumEntity = new ForumEntity();

        forumEntity.id = forum.name;
        if (forum.description) {
            forumEntity.description = forum.description;
        }

        await this.forumRepository.persistAndFlush(forumEntity);

        this.logger.log(`User ${owner.id} created a forum ${forumEntity.id}`);
        return forumEntity.id;
    }

    async findById(id: string) {
        return await this.forumRepository.findOne({ id: id });
    }

    async findByIdCase(id: string) {
        return await this.forumRepository.findOne({ 
            [expr("upper(id)")]: this.em.getKnex().raw("upper(?)", id)
        });
    }

    async findTopForums() {
        return await this.forumRepository.find(
            {},
            [],
            { subscriptions: QueryOrder.DESC },
            25,
            0
        );
    }

    async update(update: UpdateForumDto, id: string, user: User) {
        const forum = await this.findById(id);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.hasModPerms(forum, user);
        if (!hasPerms) {
            throw new ModPermissionsException();
        }

        if (update.description) {
            forum.description = update.description;
        }
        if (update.title) {
            forum.title = update.title;
        }

        await this.forumRepository.flush();

        this.logger.log(`User ${user.id} updated a forum ${forum.id}`);
        return forum;
    }
}