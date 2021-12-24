import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { ForumNotFoundException, ModeratorNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateResourceException } from "src/exception/invalidInput.exception";
import { OwnerPermissionsException } from "src/exception/permissions.exception";
import { ForumService } from "../forum/forum.service";
import { PermissionsService } from "../permissions/permissions.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateModeratorDto, DeleteModeratorDto } from "./moderator.dto";
import { ModeratorEntity } from "./moderator.entity";

@Injectable()
export class ModeratorService {
    constructor(
        @InjectRepository(ModeratorEntity) 
        private readonly modRepository: EntityRepository<ModeratorEntity>,

        private readonly permsService: PermissionsService,

        private readonly userService: UserService,

        private readonly forumService: ForumService
    ) {}

    async create(moderator: CreateModeratorDto, modifier: User) {
        const oldModEntity = await this.modRepository.findOne({ forum: moderator.forum, user: moderator.user });
        if (oldModEntity) {
            throw new DuplicateResourceException();
        }

        const forum = await this.forumService.findById(moderator.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.hasOwnerPerms(forum, modifier);
        if (hasPerms) {
            throw new OwnerPermissionsException();
        }

        const modEntity = new ModeratorEntity();

        modEntity.forum = forum;
        modEntity.user = this.userService.getEntityReference(moderator.user);

        this.modRepository.persistAndFlush(modEntity);
        return modEntity;
    }

    async findByForum(forum: string) {
        return await this.modRepository.find({ forum: forum });
    }

    async findByUser(user: User) {
        return await this.modRepository.find({ user: user.id });
    }

    async delete(del: DeleteModeratorDto, modifier: User) {
        const modEntity = await this.modRepository.findOne({ forum: del.forum, user: del.user });
        if (!modEntity) {
            throw new ModeratorNotFoundException();
        }

        const hasPerms = await this.permsService.hasOwnerPerms(modEntity.forum, modifier);
        if (!hasPerms) {
            throw new OwnerPermissionsException();
        }

        this.modRepository.removeAndFlush(modEntity);
        return modEntity;
    }
}