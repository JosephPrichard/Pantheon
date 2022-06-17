/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Query } from "@nestjs/common";
import { timeTypeToDate } from "src/utils/time.util";
import { SearchPostsDto } from "./search.dto";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {

    constructor(private readonly searchService: SearchService) {}

    @Get("/posts")
    async searchPosts(
        @Query() query: SearchPostsDto
    ) {
        const date = timeTypeToDate(query.time);

        const filter = {
            cursor: query.cursor,
            text: query.text,
            forum: query.forum,
            poster: query.poster,
            date
        };

        return await this.searchService.searchPosts(filter);
    }
}