/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { VoteService } from "../vote/vote.service";
import { Request  } from "express";
import { PostVoteEntity } from "../vote/vote.entity";
import { FeedCursorDto } from "./feed.dto";
import { CommentService } from "../comment/comment.service";
import { HighlightService } from "../highlight/highlight.service";
import { PostFilterDto } from "../post/post.dto";
import { timeTypeToDate } from "src/utils/time.util";

@Controller("feed")
export class FeedController {

    constructor(
        private readonly postService: PostService,

        private readonly commentService: CommentService,

        private readonly voteService: VoteService,

        private readonly highlightService: HighlightService
    ) {}

    @Get("/global")
    async getGlobalPosts(
        @Query() query: FeedCursorDto,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        const filter: PostFilterDto = {
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
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
    async getHomePosts(
        @Query() query: FeedCursorDto,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        const filter: PostFilterDto = {
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
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
    async getForumPosts(
        @Query() query: FeedCursorDto,
        @Param("forum") forumParam: string,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        const filter: PostFilterDto = {
            forums: [forumParam],
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
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
    async getUserPosts(
        @Query() query: FeedCursorDto,
        @Param("user") posterParam: string,
        @Req() req: Request
    ) {
        const date = timeTypeToDate(query.time);

        const filter: PostFilterDto = {
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
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

    @Get("/posts/:id/comments")
    async getPostComments(
        @Param("id") idParam: number
    ) {
        const filter = {
            post: idParam
        };

        const commentTree = await this.commentService.findTreesByFilter(filter);
        return { commentTree };
    }

}