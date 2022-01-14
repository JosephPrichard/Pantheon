import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { AppLogger } from "src/loggers/applogger";
import { SubscriptionService } from "../subscription/subscription.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { HighlightEntity } from "./highlight.entity";

const REFRESH_THRESHOLD = 1000 * 60 * 60; // 1 hour in milliseconds

@Injectable()
export class HighlightService {

    private readonly logger = new AppLogger(HighlightService.name);

    constructor(
        @InjectRepository(HighlightEntity)
        private readonly subsetRepository: EntityRepository<HighlightEntity>,

        private readonly userService: UserService,

        private readonly subService: SubscriptionService
    ) {}

    /**
     * Responsible for refreshing the highlighted subs, ideally it should be called whenever we access the subset
     * @param user that we're refreshing the susbet for
     * @return an array of strings containing the forums
     */
    async refreshThenGet(user: User) {
        const subset = await this.get(user);

        if (!subset) {
            // no subset (first time accessing the service for the user)
            const subset = new HighlightEntity();

            subset.user = this.userService.getEntityReference(user.id);
            subset.forums = await this.generateForums(user);

            await this.subsetRepository.persistAndFlush(subset);

            this.logger.log(`User ${user.id} highlights was created`);

            return subset.forums;
        } else {
            // check if we need to generate new forums or not
            const timeDiff = new Date().getTime() - subset.updatedAt.getTime();

            if (timeDiff >= REFRESH_THRESHOLD) {
                subset.forums = await this.generateForums(user);
            }
            subset.updatedAt = new Date();

            await this.subsetRepository.flush();

            this.logger.log(`User ${user.id} highlights was refreshed`);

            return subset.forums;
        }
    }

    async generateForums(user: User) {
        const subscriptions = await this.subService.findByUserRandom(user, 50);

        let logStr = "";

        const forums: string[] = [];
        for (const sub of subscriptions) {
            forums.push(sub.forum.id);
            logStr += sub.forum.id + " ";
        }

        this.logger.log(`Generated new highlighted Forums {${logStr}} for User ${user.id}`);

        return forums;
    }

    async get(user: User) {
        return await this.subsetRepository.findOne({ user: user.id });
    }
}