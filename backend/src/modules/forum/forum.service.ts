/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository, QueryOrder } from "mikro-orm";
import { EntityManager } from "@mikro-orm/postgresql";
import { ForumEntity } from "./forum.entity";

@Injectable()
export class ForumService {

    constructor(
        private readonly em: EntityManager,

        @InjectRepository(ForumEntity) 
        private readonly forumRepository: EntityRepository<ForumEntity>
    ) {}

    async findById(id: string): Promise<ForumEntity | null> {
        return await this.forumRepository.findOne({ id: id });
    }

    async findForums(limit?: number): Promise<ForumEntity[]> {
        return await this.forumRepository.find(
            {},
            [],
            { id: QueryOrder.ASC },
            limit,
        );
    }
}