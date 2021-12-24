import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { ForumNotFoundException, SubscriptionNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateResourceException } from "src/exception/invalidInput.exception";
import { ForumService } from "../forum/forum.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateSubDto, DeleteSubDto, UpdateSubDto } from "./subscription.dto";
import { SubscriptionEntity } from "./subscription.entity";

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(SubscriptionEntity) 
        private readonly subRepository: EntityRepository<SubscriptionEntity>,

        private readonly userService: UserService,

        private readonly forumService: ForumService
    ) {}

    async create(sub: CreateSubDto, user: User) {
        const oldSubEntity = await this.subRepository.findOne({ forum: sub.forum, user: user.id });
        if (oldSubEntity) {
            throw new DuplicateResourceException();
        }

        const forum = await this.forumService.findById(sub.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const subEntity = new SubscriptionEntity();

        subEntity.forum = forum;
        subEntity.user = this.userService.getEntityReference(user.id);

        forum.subscriptions += 1;

        this.subRepository.persistAndFlush(forum);
        return sub;
    }

    async findByUser(user: User) {
        return this.subRepository.find({ user: user.id }, ["forum"]);
    }

    async update(update: UpdateSubDto, user: User) {
        const subEntity = await this.subRepository.findOne({ forum: update.forum, user: user.id });
        if (!subEntity) {
            throw new SubscriptionNotFoundException();
        }

        subEntity.isFavorite = update.isFavorite;
        return subEntity;
    }

    async delete(del: DeleteSubDto, user: User) {
        const subEntity = await this.subRepository.findOne({ forum: del.forum, user: user.id }, ["forum"]);
        if (!subEntity) {
            throw new SubscriptionNotFoundException();
        }

        subEntity.forum.subscriptions -= 1;

        this.subRepository.removeAndFlush(subEntity);
        return subEntity;
    }
}