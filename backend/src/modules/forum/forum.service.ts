/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository, expr, QueryOrder } from "mikro-orm";
import { EntityManager } from "@mikro-orm/postgresql";
import { ForumNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateForumException } from "src/exception/invalidInput.exception";
import { AppLogger } from "src/loggers/applogger";
import { User } from "../user/user.dto";
import { CreateForumDto, UpdateForumDto } from "./forum.dto";
import { ForumEntity } from "./forum.entity";
import { UserService } from "../user/user.service";
import { KarmaException, ResourcePermissionsException } from "../../exception/permissions.exception";
import { MIN_ADMIN_KARMA } from "../../global";

@Injectable()
export class ForumService {

    private readonly logger = new AppLogger(ForumService.name);

    constructor(
        private readonly em: EntityManager,

        @InjectRepository(ForumEntity) 
        private readonly forumRepository: EntityRepository<ForumEntity>,

        private readonly userService: UserService
    ) {}

    async create(forum: CreateForumDto, admin: User) {
        const oldForumEntity = await this.findByIdCase(forum.name);
        if (oldForumEntity) {
            throw new DuplicateForumException(forum.name);
        }

        const user = await this.userService.findUserById(admin.id);
        if (user == null || user.karma < MIN_ADMIN_KARMA) {
            throw new KarmaException(MIN_ADMIN_KARMA);
        }

        const forumEntity = new ForumEntity();

        forumEntity.id = forum.name;
        forumEntity.admin = user;
        if (forum.description) {
            forumEntity.description = forum.description;
        }

        await this.forumRepository.persistAndFlush(forumEntity);

        this.logger.log(`User ${admin.id} created a forum ${forumEntity.id}`);
        return forumEntity.id;
    }
    
    async isAdmin(user: User) {
        return await this.forumRepository.findOne({ admin: user.id }) != null;
    }

    async findById(id: string) {
        return await this.forumRepository.findOne({ id: id });
    }

    async findByIdCase(id: string) {
        return await this.forumRepository.findOne({ 
            [expr("upper(id)")]: this.em.getKnex().raw("upper(?)", id)
        });
    }

    async findForums(limit?: number) {
        return await this.forumRepository.find(
            {},
            [],
            { id: QueryOrder.ASC },
            limit,
        );
    }

    async update(update: UpdateForumDto, id: string, user: User) {
        const forum = await this.findById(id);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = forum.admin.id == user.id;
        if (!hasPerms) {
            throw new ResourcePermissionsException();
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