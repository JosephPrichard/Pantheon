/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { CommentNotFoundException, PostNotFoundException } from "src/exception/entityNotFound.exception";
import { ResourcePermissionsException } from "src/exception/permissions.exception";
import { AppLogger } from "src/loggers/applogger";
import { PostService } from "../post/post.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CommentFilterDto, CreateCommentNodeDto, CreateCommentRootDto, UpdateCommentDto } from "./comment.dto";
import { CommentEntity } from "./comment.entity";
import { deserializeTree } from "./comment.utils";
import { NotificationService } from "../notifications/notification.service";
import { FilterQuery, ForeignKeyConstraintViolationException, QueryOrder, QueryOrderMap } from "mikro-orm";

@Injectable()
export class CommentService {

    private readonly logger = new AppLogger(CommentService.name);
    
    constructor(
        @InjectRepository(CommentEntity) 
        private readonly commentRepository: EntityRepository<CommentEntity>,

        private readonly userService: UserService,

        private readonly postService: PostService,

        private readonly notificationService: NotificationService
    ) {}

    async createRoot(root: CreateCommentRootDto, commenter: User) {
        const post = await this.postService.findById(root.post);
        if (!post) {
            throw new PostNotFoundException();
        }

        const commentEntity = new CommentEntity();
        commentEntity.content = root.content;
        commentEntity.commenter = this.userService.getEntityReference(commenter.id);
        commentEntity.post = post;
        post.comments += 1;

        await this.commentRepository.persistAndFlush(commentEntity);

        if (commentEntity.post.poster && commentEntity.post.poster.id !== commenter.id) {
            await this.notificationService.create(commentEntity, commentEntity.post.poster);
        }

        this.logger.log(`User ${commenter.id} created comment root ${commentEntity.id}`);
        return commentEntity;
    }

    async createNode(node: CreateCommentNodeDto, commenter: User) {
        const parent = await this.findById(node.parentComment);
        if (!parent) {
            throw new CommentNotFoundException();
        }

        const commentEntity = new CommentEntity();

        commentEntity.content = node.content;
        commentEntity.commenter = this.userService.getEntityReference(commenter.id);
        commentEntity.parentId = parent.id;
        commentEntity.post = parent.post;
        parent.post.comments += 1;

        await this.commentRepository.persistAndFlush(commentEntity);

        if (parent.commenter && parent.commenter.id !== commenter.id) {
            await this.notificationService.create(commentEntity, parent.commenter);
        }

        this.logger.log(`User ${commenter.id} created a comment node ${commentEntity.id}`);
        return commentEntity;
    }

    async findById(id: number) {
        return await this.commentRepository.findOne({ id: id }, ["commenter", "post"]);
    }

    async findByFilter(filter: CommentFilterDto) {
        const where: FilterQuery<any> = {};

        // add filter commenter
        where.commenter = filter.commenter;

        let sort: QueryOrderMap = { id: QueryOrder.DESC };
        // check if we should use cursors to paginate
        if (filter.afterCursor) {
            where.id = { $lt: filter.afterCursor };
        }

        // fetch comments from the repository
        const comments = await this.commentRepository.find(
            where,
            ["commenter", "post"],
            sort,
            filter.perPage + 1
        );

        // remove the extra element from the list
        const nextPage = comments.length >= filter.perPage + 1;
        if (nextPage) {
            comments.pop();
        }

        return { comments, nextPage };
    }

    async findTreesByFilter(postId: number) {
        const comments = await this.commentRepository.find(
            { post: postId },
            ["commenter"],
            { id: QueryOrder.DESC }
        );
        return deserializeTree(comments);
    }

    async update(update: UpdateCommentDto, id: number, user: User) {
        const comment = await this.findById(id);
        if (!comment) {
            throw new CommentNotFoundException();
        }

        const userMatches = comment.commenter?.id === user.id;
        if (!userMatches) {
            throw new ResourcePermissionsException();
        }

        if (update.content) {
            comment.content = update.content;
        }

        await this.commentRepository.flush();

        this.logger.log(`User ${user.id} updated comment ${comment.id}`);
        return comment;
        
    }

    async delete(id: number, user: User) {
        const comment = await this.commentRepository.findOne({ id: id }, ["commenter", "post"]);
        if (!comment) {
            throw new CommentNotFoundException();
        }

        // check if the user has permissions to perform this update
        const userMatches = comment.commenter?.id === user.id;
        if (!userMatches) {
            throw new ResourcePermissionsException();
        }

        // start by deleting the notification for the comment
        await this.notificationService.deleteByComment(comment);

        try {
            // attempts to perform a hard delete on the comment, includes decrementing comment count
            comment.post.comments -= 1;
            await this.commentRepository.remove(comment).flush();
        } catch (ex) {
            // key constraint violation exception means a child is already referencing this comment
            if (ex instanceof ForeignKeyConstraintViolationException) {
                // performs a "soft delete" instead on the comment by fetching and updating fields
                comment.commenter = null;
                comment.content = "";

                await this.commentRepository.flush();
            }
        }

        this.logger.log(`User ${user.id} deleted comment ${comment.id}`);
        return comment;
    }

    async deleteAll(user: User) {
        const count = await this.commentRepository.nativeUpdate(
            { commenter: user.id },
            { commenter: null, content: "" }
        );
        this.logger.log(`User ${user.id}'s comments were deleted`);
        return count;
    }
}