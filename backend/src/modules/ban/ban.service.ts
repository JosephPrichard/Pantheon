import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { ForumNotFoundException, BanNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateResourceException } from "src/exception/invalidInput.exception";
import { ModPermissionsException } from "src/exception/permissions.exception";
import { ForumService } from "../forum/forum.service";
import { PermissionsService } from "../permissions/permissions.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateBanDto, DeleteBanDto } from "./ban.dto";
import { BanEntity } from "./ban.entity";

@Injectable()
export class BanService {
    
    constructor(
        @InjectRepository(BanEntity) 
        private readonly banRepository: EntityRepository<BanEntity>,

        private readonly permsService: PermissionsService,

        private readonly forumService: ForumService,

        private readonly userService: UserService
    ) {}

    async ban(ban: CreateBanDto, banning: User) {
        const oldBanEntity = await this.banRepository.findOne({ forum: ban.forum, bannedUser: ban.user });
        if (oldBanEntity) {
            throw new DuplicateResourceException();
        }

        const forum = await this.forumService.findById(ban.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.hasModPerms(forum, banning);
        if (!hasPerms) {
            throw new ModPermissionsException();
        }

        const banEntity = new BanEntity();
    
        banEntity.forum = forum;
        banEntity.bannedUser = this.userService.getEntityReference(ban.user);
        banEntity.banningUser = this.userService.getEntityReference(banning.id);

        this.banRepository.persistAndFlush(banEntity);
        return banEntity;
    }

    async findBansByBanned(bannedUser: User) {
        const bans = await this.banRepository.find({ bannedUser: bannedUser.id });
        return bans;
    }

    async findBansByBanning(banningUser: User) {
        const bans = await this.banRepository.find({ banningUser: banningUser.id });
        return bans;
    }

    async unban(unban: DeleteBanDto, unbanning: User) {
        const forum = await this.forumService.findById(unban.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.hasModPerms(forum, unbanning);
        if (!hasPerms) {
            throw new ModPermissionsException();
        }

        const ban = await this.banRepository.findOne({ forum: unban.forum, bannedUser: unban.user });
        if (!ban) {
            throw new BanNotFoundException();
        }

        this.banRepository.removeAndFlush(ban);
        return ban;
    }
}