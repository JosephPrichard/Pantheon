/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { ForumNotFoundException, ModeratorNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateResourceException } from "src/exception/invalidInput.exception";
import { OwnerPermissionsException } from "src/exception/permissions.exception";
import { AppLogger } from "src/loggers/applogger";
import { ForumService } from "../forum/forum.service";
import { PermissionsService } from "../permissions/permissions.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateModeratorDto, DeleteModeratorDto } from "./moderator.dto";
import { ModeratorEntity } from "./moderator.entity";

@Injectable()
export class ModeratorService {

    private readonly logger = new AppLogger(ModeratorService.name);

    constructor(
        @InjectRepository(ModeratorEntity) 
        private readonly modRepository: EntityRepository<ModeratorEntity>,

        private readonly permsService: PermissionsService,

        private readonly userService: UserService,

        private readonly forumService: ForumService
    ) {}

    async appointMod(moderator: CreateModeratorDto, modifier: User) {
        const oldModEntity = await this.modRepository.findOne({ forum: moderator.forum, user: moderator.user });
        if (oldModEntity) {
            throw new DuplicateResourceException();
        }

        const forum = await this.forumService.findById(moderator.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.hasModPerms(forum, modifier);
        if (!hasPerms) {
            throw new OwnerPermissionsException();
        }

        const modEntity = new ModeratorEntity();

        modEntity.forum = forum;
        modEntity.user = this.userService.getEntityReference(moderator.user);

        await this.modRepository.persistAndFlush(modEntity);
        
        this.logger.log(`User ${modifier.id} appointed ${moderator.user} to be a mod on forum ${forum.id}`);
        return modEntity;
    }

    async findByForum(forum: string) {
        return await this.modRepository.find({ forum: forum }, ["user"]);
    }

    async findByUser(user: User) {
        return await this.modRepository.find({ user: user.id }, ["user"]);
    }

    async removeMod(del: DeleteModeratorDto, modifier: User) {
        const mod = await this.modRepository.findOne({ forum: del.forum, user: del.user });
        if (!mod) {
            throw new ModeratorNotFoundException();
        }

        const hasPerms = await this.permsService.hasHigherModPerms(mod.forum, modifier.id, del.user);
        if (!hasPerms) {
            throw new OwnerPermissionsException();
        }

        await this.modRepository.removeAndFlush(mod);

        this.logger.log(`User ${modifier.id} removed ${del.user} mod status on forum ${mod.forum.id}`);
        return mod;
    }
}