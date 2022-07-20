/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { AppLogger } from "src/loggers/applogger";
import { SubscriptionService } from "../subscription/subscription.service";
import { UserService } from "../user/user.service";
import { HighlightEntity } from "./highlight.entity";
import { User } from "../user/user.interface";
import { REFRESH_THRESHOLD } from "../../global";

@Injectable()
export class HighlightService {

    private readonly logger = new AppLogger(HighlightService.name);

    constructor(
        @InjectRepository(HighlightEntity)
        private readonly highlightRepository: EntityRepository<HighlightEntity>,

        private readonly userService: UserService,

        private readonly subService: SubscriptionService
    ) {}

    // responsible for refreshing the highlighted subs, ideally it should be called whenever we access the highlights
    async refreshThenGet(user: User): Promise<string[]> {
        const highlight = await this.findHighlight(user);

        if (!highlight) {
            // no highlights (first time accessing the service for the user)
            const subset = new HighlightEntity();

            subset.user = this.userService.getEntityReference(user.id);
            subset.forums = await this.generateForums(user);

            await this.highlightRepository.persistAndFlush(subset);

            this.logger.log(`User ${user.id} highlights was created`);

            return subset.forums;
        } else {
            // check if we need to generate new forums or not
            const timeDiff = new Date().getTime() - highlight.updatedAt.getTime();

            if (timeDiff >= REFRESH_THRESHOLD) {
                highlight.forums = await this.generateForums(user);
            }
            highlight.updatedAt = new Date();

            await this.highlightRepository.flush();

            this.logger.log(`User ${user.id} highlights was refreshed`);

            return highlight.forums;
        }
    }

    // generates new highlighted forums for a user
    async generateForums(user: User): Promise<string[]> {
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

    async findHighlight(user: User): Promise<HighlightEntity | null> {
        return await this.highlightRepository.findOne({ user: user.id });
    }
}