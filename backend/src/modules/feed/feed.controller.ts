/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { VoteService } from "../vote/vote.service";
import { Request  } from "express";
import { CommentVoteEntity, PostVoteEntity } from "../vote/vote.entity";
import { ActivityFeedCursorDto, FeedCursorDto, HomeFeedCursorDto } from "./feed.dto";
import { CommentService } from "../comment/comment.service";
import { HighlightService } from "../highlight/highlight.service";
import { PostFilterDto } from "../post/post.dto";
import { PER_PAGE } from "../../global";
import { CommentFilterDto } from "../comment/comment.dto";
import { countActivities, mergeActivity } from "./feed.utils";

@Controller("feed")
export class FeedController {

    constructor(
        private readonly postService: PostService,

        private readonly commentService: CommentService,

        private readonly voteService: VoteService,

        private readonly highlightService: HighlightService
    ) {}

    @Get("global")
    async getGlobalPosts(
        @Query() query: FeedCursorDto,
        @Req() req: Request
    ) {
        const filter: PostFilterDto = {
            afterCursor: query.afterCursor,
            beforeCursor: query.beforeCursor,
            perPage: PER_PAGE
        };

        if (query.user) {
            filter.poster = query.user;
        }
        if (query.forum) {
            filter.forums = [query.forum];
        }

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
        @Query() query: HomeFeedCursorDto,
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

    @Get("/posts/:id/comments")
    async getPostComments(@Param("id") idParam: number) {
        const commentTree = await this.commentService.findTreesByFilter(idParam);
        return { commentTree };
    }

    @Get("/users/:user/activities")
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

        const user = req.session.user;
        let postVotes: PostVoteEntity[] = [];
        let commentVotes: CommentVoteEntity[] = [];
        if (user) {
            const [p, c] = await Promise.all([
                this.voteService.findPostVotes(postsResult.posts, user),
                this.voteService.findCommentVotes(commentsResults.comments, user)
            ]);
            postVotes = p;
            commentVotes = c;
        }

        const activities = mergeActivity(postsResult.posts, commentsResults.comments, PER_PAGE);
        const nextPage = countActivities(activities, true) < postsResult.posts.length
            || countActivities(activities, false) < commentsResults.comments.length;

        console.log(activities);
        console.log(postVotes);

        return {
            activities,
            nextPage,
            postVotes,
            commentVotes
        };
    }
}