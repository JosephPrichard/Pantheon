import { Controller, Get, Query } from "@nestjs/common";
import { timeTypeToDate } from "src/utils/time.util";
import { SearchDto, SearchPostsDto } from "./search.dto";
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
            page: query.page,
            text: query.text,
            forum: query.forum,
            poster: query.poster,
            date
        };

        return await this.searchService.searchPosts(filter);
    }

    @Get("/users")
    async searchUsers(
        @Query() query: SearchDto
    ) {
        const filter = {
            page: query.page,
            text: query.text
        };

        return await this.searchService.searchUsers(filter);
    }

    @Get("/forums") 
    async searchForums(
        @Query() query: SearchDto
    ) {
        const filter = {
            page: query.page,
            text: query.text
        };

        return await this.searchService.searchForums(filter);
    }
}