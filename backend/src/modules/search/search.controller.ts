/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Query, Req } from "@nestjs/common";
import { SearchPostsDto } from "./search.dto";
import { SearchService } from "./search.service";
import { PostVoteEntity } from "../vote/vote.entity";
import { Request } from "express";
import { VoteService } from "../vote/vote.service";
import { SearchRo } from "./search.interface";

@Controller("search")
export class SearchController {

    constructor(
        private readonly searchService: SearchService,

        private readonly voteService: VoteService
    ) {}

    @Get("/posts")
    async searchPosts(@Query() query: SearchPostsDto, @Req() req: Request): Promise<SearchRo> {
        const filter = {
            cursor: query.cursor,
            text: query.text,
            forum: query.forum,
            poster: query.poster
        };

        const results = await this.searchService.searchPosts(filter);

        let postVotes: PostVoteEntity[] = [];
        const user = req.session.user;
        if (user) {
            const ids = [];
            for (const post of results.posts) {
                ids.push(post.id);
            }
            postVotes = await this.voteService.findPostVotesFromIds(ids, user);
        }

        return { ...results, postVotes };
    }
}