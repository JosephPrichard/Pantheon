import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { BanEntity } from "../ban/ban.entity";
import { ForumEntity } from "../forum/forum.entity";
import { ModeratorEntity } from "../moderator/moderator.entity";
import { User } from "../user/user.dto";

export class PermissionsService {
    
    constructor(
        @InjectRepository(ModeratorEntity) 
        private readonly modRepository: EntityRepository<ModeratorEntity>,

        @InjectRepository(BanEntity) 
        private readonly banRepository: EntityRepository<BanEntity>
    ) {}

    async isModerator(forum: ForumEntity, user: User) {
        return await this.modRepository.findOne({ forum: forum, user: user.id }) !== undefined;
    }

    async hasModPerms(forum: ForumEntity, user: User) {
        const isMod = await this.isModerator(forum, user);
        return isMod || this.isOwner(forum, user);
    }

    async isOwner(forum: ForumEntity, user: User) {
        return forum.owner.id === user.id;
    }

    async hasOwnerPerms(forum: ForumEntity, user: User) {
        return this.isOwner(forum, user);
    }

    async isBanned(forum: ForumEntity, user: User) {
        return await this.banRepository.findOne({ forum: forum, bannedUser: user.id }) !== undefined;
    }
}