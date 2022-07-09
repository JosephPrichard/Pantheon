/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { VoteService } from "../vote/vote.service";
import { Request  } from "express";
import { PostVoteEntity } from "../vote/vote.entity";
import { ActivityFeedCursorDto, FeedCursorDto } from "./feed.dto";
import { CommentService } from "../comment/comment.service";
import { HighlightService } from "../highlight/highlight.service";
import { PostFilterDto } from "../post/post.dto";
import { PER_PAGE } from "../../global";
import { CommentFilterDto } from "../comment/comment.dto";
import { mergeActivity } from "./feed.utils";

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
        const filter: PostFilterDto = {
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
            perPage: PER_PAGE
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
        const filter: PostFilterDto = {
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
            perPage: PER_PAGE
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
        const filter: PostFilterDto = {
            forums: [forumParam],
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
            perPage: PER_PAGE
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
        @Param("user") userParam: string,
        @Req() req: Request
    ) {
        const filter: PostFilterDto = {
            poster: userParam,
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
            perPage: PER_PAGE
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
    async getPostComments(@Param("id") idParam: number) {
        const filter = {
            post: idParam
        };

        const commentTree = await this.commentService.findTreesByFilter(filter);
        return { commentTree };
    }

    @Get("/users/:user/activity")
    async getUserActivity(
        @Query() query: ActivityFeedCursorDto,
        @Param("user") userParam: string,
        @Req() req: Request
    ) {
        const postFilter: PostFilterDto = {
            poster: userParam,
            afterCursor: query.postsAfterCursor,
            perPage: PER_PAGE * 2
        };

        const commentFilter: CommentFilterDto = {
            commenter: userParam,
            afterCursor: query.commentsAfterCursor,
            perPage: PER_PAGE * 2
        };

        const [postsResult, commentsResults] = await Promise.all([
            this.postService.findByFilter(postFilter),
            this.commentService.findByFilter(commentFilter)
        ]);

        const activities = mergeActivity(postsResult.posts, commentsResults.comments, PER_PAGE);
        const nextPage = postsResult.nextPage || commentsResults.nextPage;

        return { activities, nextPage };
    }
}