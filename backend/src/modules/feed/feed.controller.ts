/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { PostService } from "../post/post.service";
import { VoteService } from "../vote/vote.service";
import { Request  } from "express";
import { CommentVoteEntity, PostVoteEntity } from "../vote/vote.entity";
import { ActivityFeedDto, FeedDto, HomeFeedDto} from "./feed.dto";
import { CommentService } from "../comment/comment.service";
import { HighlightService } from "../highlight/highlight.service";
import { PER_PAGE } from "../../global";
import { countActivities, mergeActivity } from "./feed.utils";
import { ActivityFeedRo, CommentFeedRo, FeedRo } from "./feed.interface";
import { CommentFilter } from "../comment/comment.interface";
import { PostFilter } from "../post/post.interface";

@Controller("feed")
export class FeedController {

    constructor(
        private readonly postService: PostService,

        private readonly commentService: CommentService,

        private readonly voteService: VoteService,

        private readonly highlightService: HighlightService
    ) {}

    @Get("global")
    async getGlobalPosts(@Query() query: FeedDto, @Req() req: Request): Promise<FeedRo> {
        const filter: PostFilter = {
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
    async getHomePosts(@Query() query: HomeFeedDto, @Req() req: Request): Promise<FeedRo> {
        const filter: PostFilter = {
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
    async getPostComments(@Param("id") idParam: number): Promise<CommentFeedRo> {
        const commentTree = await this.commentService.findTreesByFilter(idParam);
        return { commentTree };
    }

    @Get("/activities")
    async getUserActivity(@Query() query: ActivityFeedDto, @Req() req: Request): Promise<ActivityFeedRo> {
        const postFilter: PostFilter = {
            poster: query.user,
            afterCursor: query.postsAfterCursor,
            perPage: PER_PAGE * 2
        };

        const commentFilter: CommentFilter = {
            commenter: query.user,
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