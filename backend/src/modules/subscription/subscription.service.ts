import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { ForumNotFoundException, SubscriptionNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateResourceException } from "src/exception/invalidInput.exception";
import { AppLogger } from "src/loggers/applogger";
import { ForumService } from "../forum/forum.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateSubDto, DeleteSubDto, UpdateSubDto } from "./subscription.dto";
import { SubscriptionEntity } from "./subscription.entity";

@Injectable()
export class SubscriptionService {

    private readonly logger = new AppLogger(SubscriptionService.name);

    constructor(
        private readonly em: EntityManager,

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

        await this.subRepository.persistAndFlush(subEntity);

        this.logger.log(`User ${user.id} created a subscription to forum ${forum.id}`);
        return sub;
    }

    async findByUser(user: User) {
        return this.subRepository.find({ user: user.id }, ["forum"]);
    }

    async findByUserRandom(user: User, amount: number) {
        const qb = this.em.createQueryBuilder(SubscriptionEntity);
        qb.select("*").where({ user: user.id })

        const knex = qb.getKnex();
        const subs = await knex.orderByRaw("random()").limit(amount);
        
        return subs.map((sub: any) => this.subRepository.map(sub)) as SubscriptionEntity[];
    }

    async update(update: UpdateSubDto, user: User) {
        const sub = await this.subRepository.findOne({ forum: update.forum, user: user.id });
        if (!sub) {
            throw new SubscriptionNotFoundException();
        }

        sub.isFavorite = update.isFavorite;

        await this.subRepository.flush();

        this.logger.log(`User ${user.id} updated their subscription to forum ${sub.forum.id}`);
        return sub;
    }

    async delete(del: DeleteSubDto, user: User) {
        const sub = await this.subRepository.findOne({ forum: del.forum, user: user.id }, ["forum"]);
        if (!sub) {
            throw new SubscriptionNotFoundException();
        }

        sub.forum.subscriptions -= 1;

        await this.subRepository.removeAndFlush(sub);

        this.logger.log(`User ${user.id} deleted their subscription to forum ${sub.forum.id}`);
        return sub;
    }
}