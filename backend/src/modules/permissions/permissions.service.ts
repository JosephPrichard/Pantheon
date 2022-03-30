/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
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
        const mod = await this.modRepository.findOne({ forum: forum, user: user.id });
        return mod !== null;
    }

    async hasModPerms(forum: ForumEntity, user: User) {
        return await this.isModerator(forum, user);
    }

    async hasHigherModPerms(forum: ForumEntity, user1: number, user2: number) {
        const mod1 = await this.modRepository.findOne({ forum: forum, user: user1 });
        const mod2 = await this.modRepository.findOne({ forum: forum, user: user2 });

        if (!mod1 || !mod2) {
            return false;
        }

        return mod1?.createdAt <= mod2?.createdAt;
    }

    async isBanned(forum: ForumEntity, user: User) {
        return await this.banRepository.findOne({ forum: forum, bannedUser: user.id }) !== undefined;
    }
}