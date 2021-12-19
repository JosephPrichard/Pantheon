import { Controller, Get, Query, Req, Res } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { VoteService } from "../vote/vote.service";
import { Request, Response } from "express";
import { PostVoteEntity } from "../vote/vote.entity";
import { FeedPostDto } from "./feed.dto";
import { ALLTIME, TimeType } from "src/utils/global";

@Controller("feed")
export class FeedController {

    constructor(
        private readonly postService: PostService,
        private readonly voteService: VoteService
    ) {}

    @Get("/posts") 
    async search(
        @Query() query: FeedPostDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const date = query.time && query.time !== ALLTIME ? calculateDate(query.time) : undefined;

        if (query.page <= 0) {
            query.page = 1;
        }

        const filter = {
            poster: query.poster,
            sort: query.sort,
            page: query.page,
            date
        };

        const result = await this.postService.findByFilter(filter);

        const user = req.session.user;
        let postVotes: PostVoteEntity[] = [];
        if (user) {
            postVotes = await this.voteService.findPostVotes(result.posts, user);
        }
        
        res.json({ ...result, postVotes });
    }
}

function calculateDate(time: TimeType) {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    switch(time) {
        case "day": {
            const newDate = new Date();
            newDate.setDate(date - 1);
            return newDate;
        }
        case "week": {
            const newDate = new Date();
            newDate.setDate(date - 7);
            return newDate;
        }
        case "month": {
            return new Date(year, month - 1, date);
        }
        case "year": {
            return new Date(year - 1, month, date);
        }
    }
}