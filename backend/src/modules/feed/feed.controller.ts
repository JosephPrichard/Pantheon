import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { VoteService } from "../vote/vote.service";
import { Request  } from "express";
import { PostVoteEntity } from "../vote/vote.entity";
import { PageDto, FeedDto } from "./feed.dto";
import { CommentService } from "../comment/comment.service";
import { HighlightService } from "../highlight/highlight.service";
import { InvalidSessionException } from "src/exception/session.exception";
import { PostFilter } from "../post/post.dto";
import { timeTypeToDate } from "src/utils/time";

@Controller("feed")
export class FeedController {

    constructor(
        private readonly postService: PostService,

        private readonly commentService: CommentService,

        private readonly voteService: VoteService,

        private readonly highlightService: HighlightService
    ) {}

    @Get("/popular/posts") 
    async filterHomePosts(
        @Query() query: FeedDto,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        if (query.page <= 0) {
            query.page = 1;
        }

        const filter: PostFilter = {
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
        
        return { ...result, postVotes };
    }

    @Get("/home/posts") 
    async filterPopularPosts(
        @Query() query: FeedDto,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        if (query.page <= 0) {
            query.page = 1;
        }

        const user = req.session.user;  
        if (!user) {
            throw new InvalidSessionException();
        }

        const subbedForums = await this.highlightService.refreshThenGet(user);

        const filter: PostFilter = {
            forums: subbedForums,
            sort: query.sort,
            page: query.page,
            date
        };

        const result = await this.postService.findByFilter(filter);

        let postVotes: PostVoteEntity[] = [];
        if (user) {
            postVotes = await this.voteService.findPostVotes(result.posts, user);
        }
        
        return { ...result, postVotes };
    }

    @Get("/forum/:forum/posts") 
    async filterForumPosts(
        @Query() query: FeedDto,
        @Param("forum") forumParam: string,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        if (query.page <= 0) {
            query.page = 1;
        }

        const filter: PostFilter = {
            forums: [forumParam],
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
        
        return { ...result, postVotes };
    }

    @Get("/user/:user/posts") 
    async filterUserPosts(
        @Query() query: FeedDto,
        @Param("user") posterParam: string,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        if (query.page <= 0) {
            query.page = 1;
        }

        const filter: PostFilter = {
            poster: posterParam,
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
        
        return { ...result, postVotes };
    }

    @Get("/user/:user/comments")
    async filterComments(
        @Query() query: FeedDto,
        @Param("user") commenterParam: string
    ) {
        const date = timeTypeToDate(query.time);

        const filter = {
            page: query.page,
            sort: query.sort,
            commenter: commenterParam,
            date
        };

        const result = await this.commentService.findByFilter(filter);
        return { result };
    }

    @Get("/post/:id/comments")
    async filterPostComments(
        @Query() query: PageDto,
        @Param("id") idParam: string
    ) {
        const filter = {
            post: idParam,
            page: query.page
        };

        const commentTree = await this.commentService.findTreesByFilter(filter);
        return { commentTree };
    }

}