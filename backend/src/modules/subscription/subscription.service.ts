import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { CircleService } from "../circle/circle.service";
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

        private readonly circleService: CircleService
    ) {}

    async create(sub: CreateSubDto, user: User) {
        const subEntity = await this.subRepository.findOne({ circle: sub.circle, user: user.id });

        if (!subEntity) {
            const subEntity = new SubscriptionEntity();

            const circle = await this.circleService.findById(sub.circle);
            if (circle) {
                subEntity.circle = circle;
                subEntity.user = this.userService.getEntityReference(user.id);

                circle.subscriptions += 1;
            } else {
                return;
            }

            this.subRepository.persistAndFlush(circle);
            return sub;
        }
    }

    async findByUser(user: User) {
        return this.subRepository.find({ user: user.id }, ["circle"]);
    }

    async update(update: UpdateSubDto, user: User) {
        const subEntity = await this.subRepository.findOne({ circle: update.circle, user: user.id });

        if (subEntity) {
            subEntity.isFavorite = update.isFavorite;
            return subEntity;
        }
    }

    async delete(del: DeleteSubDto, user: User) {
        const subEntity = await this.subRepository.findOne({ circle: del.circle, user: user.id }, ["circle"]);

        if (subEntity) {
            subEntity.circle.subscriptions -= 1;

            this.subRepository.removeAndFlush(subEntity);
            return subEntity;
        }
    }
}