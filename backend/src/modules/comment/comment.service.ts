import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { QueryOrder } from "mikro-orm";
import { CommentNotFoundException, PostNotFoundException } from "src/exception/entityNotFound.exception";
import { BannedException, ResourcePermissionsException } from "src/exception/permissions.exception";
import { AppLogger } from "src/loggers/applogger";
import { appendNode, serializePath } from "src/utils/nodeSerializer.util";
import { countPages, pageOffset, PER_PAGE } from "src/utils/paginator.util";
import { PermissionsService } from "../permissions/permissions.service";
import { PostService } from "../post/post.service";
import { TaskService } from "../task/task.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CommentFilter, CommentTreeFilter, CreateCommentNodeDto, CreateCommentRootDto, UpdateCommentDto } from "./comment.dto";
import { CommentEntity } from "./comment.entity";

@Injectable()
export class CommentService {

    private readonly logger = new AppLogger(CommentService.name);
    
    constructor(
        @InjectRepository(CommentEntity) 
        private readonly commentRepository: EntityRepository<CommentEntity>,

        private readonly permsService: PermissionsService,

        private readonly userService: UserService,

        private readonly postService: PostService,

        private readonly taskService: TaskService
    ) {}

    async createRoot(root: CreateCommentRootDto, commenter: User) {
        const post = await this.postService.findById(root.post);
        if (!post) {
            throw new PostNotFoundException();
        }

        const hasPerms = await this.permsService.isBanned(post.forum, commenter);
        if (!hasPerms) {
            throw new BannedException();
        }

        const commentEntity = new CommentEntity();
        commentEntity.content = root.content;
        commentEntity.commenter = this.userService.getEntityReference(commenter.id);
        commentEntity.post = post;
        post.comments += 1;

        await this.commentRepository.persistAndFlush(commentEntity);

        this.logger.log(`User ${commenter.id} created comment root ${commentEntity.id}`);
        return commentEntity.id;
    }

    async createNode(node: CreateCommentNodeDto, commenter: User) {
        const parent = await this.findById(node.parentComment);
        if (!parent) {
            throw new PostNotFoundException();
        }

        const hasPerms = await this.permsService.isBanned(parent.post.forum, commenter);
        if (!hasPerms) {
            throw new BannedException();
        }

        const commentEntity = new CommentEntity();

        commentEntity.content = node.content;
        commentEntity.commenter = this.userService.getEntityReference(commenter.id);
        commentEntity.path = appendNode(parent.path, parent.id);
        commentEntity.post = parent.post;
        parent.post.comments += 1;

        await this.commentRepository.persistAndFlush(commentEntity);

        this.logger.log(`User ${commenter.id} created a comment node ${commentEntity.id}`);
        return commentEntity.id;
    }

    async findById(id: number) {
        return await this.commentRepository.findOne({ id: id }, ["commenter", "post"]);
    }

    async findManyByIds(ids: number[]) {
        return await this.commentRepository.findOne({ id: { $in: ids } });
    }

    async findTreeByPath(path: number[]) {
        const compare = serializePath(path) + "%";
        return await this.commentRepository.find({ path: { $like: compare } }, ["commenter"]);
    }

    async findByFilter(filter: CommentFilter) {
        const where: any = {};
        if (filter.commenter) {
            where.commenter = filter.commenter;
        }

        const [comments, count] = await this.commentRepository.findAndCount(
            where,
            ["commenter"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            PER_PAGE,
            pageOffset(filter.page)
        );

        return {
            comments,
            pageCount: countPages(count)
        };
    }

    async findTreesByFilter(filter: CommentTreeFilter) {
        const comments = await this.commentRepository.find({ post: filter.post }, ["commenter"]);
        return await this.taskService.executeDeserializeTreeTask(comments);
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

        const userMatches = comment.commenter?.id === user.id;
        const hasModPerms = await this.permsService.hasModPerms(comment.post.forum, user);
        if (!userMatches && !hasModPerms) {
            throw new ResourcePermissionsException();
        }

        comment.commenter = null;
        comment.content = "";
        
        await this.commentRepository.flush();

        this.logger.log(`User ${user.id} deleted comment ${comment.id}`);
        return comment;
    }

}