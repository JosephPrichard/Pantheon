/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { VoteService } from "../vote/vote.service";
import { Request  } from "express";
import { PostVoteEntity } from "../vote/vote.entity";
import { FeedDto } from "./feed.dto";
import { CommentService } from "../comment/comment.service";
import { HighlightService } from "../highlight/highlight.service";
import { PostFilter } from "../post/post.dto";
import { timeTypeToDate } from "src/utils/time.util";

@Controller("feed")
export class FeedController {

    constructor(
        private readonly postService: PostService,

        private readonly commentService: CommentService,

        private readonly voteService: VoteService,

        private readonly highlightService: HighlightService
    ) {}

    @Get("/popular") 
    async filterPopularPosts(
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

    @Get("/home") 
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

        const user = req.session.user;  
        if (user) {
            const subbedForums = await this.highlightService.refreshThenGet(user);
            if (subbedForums.length >= 2) {
                filter.forums = subbedForums;
            }
        }

        const result = await this.postService.findByFilter(filter);

        let postVotes: PostVoteEntity[] = [];
        if (user) {
            postVotes = await this.voteService.findPostVotes(result.posts, user);
        }
        
        return { ...result, postVotes };
    }

    @Get("/forums/:forum/posts") 
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

    @Get("/users/:user/posts") 
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

    @Get("/users/:user/comments")
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

    @Get("/posts/:id/comments")
    async filterPostComments(
        @Param("id") idParam: number
    ) {
        const filter = {
            post: idParam
        };

        const commentTree = await this.commentService.findTreesByFilter(filter);
        return { commentTree };
    }

}