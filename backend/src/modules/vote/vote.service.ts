/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../post/post.entity";
import { CommentVoteEntity, PostVoteEntity } from "./vote.entity";
import { VoteDto } from "./vote.dto";
import { CommentService } from "../comment/comment.service";
import { PostService } from "../post/post.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "mikro-orm";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CommentNotFoundException, PostNotFoundException } from "src/exception/entityNotFound.exception";
import { AppLogger } from "src/loggers/applogger";
import { calcHotRank } from "src/utils/hotrank.util";

@Injectable()
export class VoteService {

    private readonly logger = new AppLogger(VoteService.name);

    constructor(
        @InjectRepository(CommentVoteEntity) 
        private readonly commentVoteRepository: EntityRepository<CommentVoteEntity>,

        @InjectRepository(PostVoteEntity) 
        private readonly postVoteRepository: EntityRepository<PostVoteEntity>,

        private readonly userService: UserService,

        private readonly postService: PostService,

        private readonly commentService: CommentService
    ) {}

    async votePost(newVote: VoteDto, voter: User) {
        const post = await this.postService.findById(newVote.resource);
        if (!post?.poster) {
            throw new PostNotFoundException();
        }

        const voteEntity = await this.postVoteRepository.findOne({ post: newVote.resource, voter: voter.id });
        // check if vote entity already exists in database
        if (voteEntity) {
            // if so, we need to update the vote entity's value
            const diff = newVote.value - voteEntity.value;

            post.poster.karma += diff;
            post.votes += diff;
            post.hotRank = calcHotRank(post.votes, post.createdAt);

            voteEntity.value = newVote.value;

            await this.postVoteRepository.flush();

            this.logger.log(`User ${voter.id} updated a vote on post ${voteEntity.post.id}`);
            return voteEntity;
        } else {
            // otherwise we create a new vote entity and persist it
            post.poster.karma += newVote.value;
            post.votes += newVote.value;
            post.hotRank = calcHotRank(post.votes, post.createdAt);

            const voteEntity = new PostVoteEntity();   
            voteEntity.post = post;
            voteEntity.voter = this.userService.getEntityReference(voter.id);
            voteEntity.value = newVote.value;

            await this.postVoteRepository.persistAndFlush(voteEntity);

            this.logger.log(`User ${voter.id} created a vote on post ${voteEntity.post.id}`);
            return voteEntity;
        }
    }

    async voteComment(newVote: VoteDto, voter: User) {
        const comment = await this.commentService.findById(newVote.resource);
        if (!comment?.commenter) {
            throw new CommentNotFoundException();
        }

        const voteEntity = await this.commentVoteRepository.findOne({ comment: newVote.resource, voter: voter.id });
        // check if vote entity already exists in database
        if (voteEntity) {
            // if so, we need to update the vote entity's value
            const diff = newVote.value - voteEntity.value;

            comment.commenter.karma += diff;
            comment.votes += diff;

            voteEntity.value = newVote.value;

            await this.commentVoteRepository.flush();

            this.logger.log(`User ${voter.id} updated a vote on comment ${voteEntity.comment.id}`);
            return voteEntity;
        } else {
            // otherwise we create a new vote entity and persist it
            comment.commenter.karma += newVote.value;
            comment.votes += newVote.value;

            const voteEntity = new CommentVoteEntity();   
            voteEntity.comment = comment;
            voteEntity.voter = this.userService.getEntityReference(voter.id);
            voteEntity.value = newVote.value;
            voteEntity.post = comment.post;

            await this.commentVoteRepository.persistAndFlush(voteEntity);

            this.logger.log(`User ${voter.id} created a vote on comment ${voteEntity.comment.id}`);
            return voteEntity;
        }
    }

    async findPostVote(postId: number, voter: User) {
        return await this.postVoteRepository.findOne({ voter: voter.id, post: postId });
    }

    async findPostVotes(posts: PostEntity[], voter: User) {
        return await this.postVoteRepository.find({ voter: voter.id, post: { $in: posts } });
    }

    async findCommentVotes(postId: number, voter: User) {
        return await this.commentVoteRepository.find({ voter: voter.id, post: postId });
    }
}