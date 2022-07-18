/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { VoteModule } from "../vote/vote.module";

@Module({
    imports: [MikroOrmModule.forFeature([ForumEntity, UserEntity]), VoteModule],
    exports: [SearchService],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}