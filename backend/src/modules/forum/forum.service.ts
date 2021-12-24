import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { ForumNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateForumException, DuplicateResourceException } from "src/exception/invalidInput.exception";
import { ModPermissionsException } from "src/exception/permissions.exception";
import { PermissionsService } from "../permissions/permissions.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateForumDto, UpdateForumDto } from "./forum.dto";
import { ForumEntity } from "./forum.entity";

@Injectable()
export class ForumService {

    constructor(
        @InjectRepository(ForumEntity) 
        private readonly forumRepository: EntityRepository<ForumEntity>,

        private readonly permsService: PermissionsService,

        private readonly userService: UserService
    ) {}

    async create(forum: CreateForumDto, owner: User) {
        const oldForumEntity = await this.findById(forum.name);
        if (oldForumEntity) {
            throw new DuplicateForumException(forum.name.toLowerCase());
        }

        const forumEntity = new ForumEntity();

        forumEntity.id = forum.name.toLowerCase();
        forumEntity.owner = this.userService.getEntityReference(owner.id);

        this.forumRepository.persistAndFlush(forumEntity);
        return forumEntity.id;
    }

    async findById(id: string) {
        return await this.forumRepository.findOne({ id: id.toLowerCase() });
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
        if (update.image) {
            forum.image = update.image;
        }

        this.forumRepository.flush();
        return forum;
    }
}