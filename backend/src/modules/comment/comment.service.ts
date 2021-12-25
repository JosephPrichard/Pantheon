import { CommentEntity } from "./comment.entity";
import { CommentFilter, CommentTreeFilter, CreateCommentNodeDto, CreateCommentRootDto, UpdateCommentDto } from "./comment.dto";
import { QueryOrder } from "mikro-orm";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository} from "@mikro-orm/nestjs";
import { PostService } from "../post/post.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { PermissionsService } from "../permissions/permissions.service";
import { PostNotFoundException, CommentNotFoundException } from "src/exception/entityNotFound.exception";
import { BannedException, ResourcePermissionsException } from "src/exception/permissions.exception";
import { appendNode, serializePath } from "src/utils/node.serializer";
import { TaskService } from "../task/task.service";

@Injectable()
export class CommentService {
    
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

        this.commentRepository.persistAndFlush(commentEntity);
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

        this.commentRepository.persistAndFlush(commentEntity);
        return commentEntity.id;
    }

    async findById(id: string) {
        return await this.commentRepository.findOne({ id: id }, ["commenter"]);
    }

    async findManyByIds(ids: string[]) {
        return await this.commentRepository.findOne({ id: { $in: ids } });
    }

    async findTreeByPath(path: string[]) {
        const compare = serializePath(path) + "%";
        return await this.commentRepository.find({ path: { $like: compare } }, ["commenter"]);
    }

    async findByFilter(filter: CommentFilter) {
        const where: any = {};
        if (filter.commenter) {
            where.commenter = filter.commenter;
        }

        const perPage = 15;

        const comments = await this.commentRepository.find(
            where,
            ["commenter"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            perPage,
            (filter.page - 1) * perPage
        );

        return comments;
    }

    async findTreesByFilter(filter: CommentTreeFilter) {
        const comments = await this.commentRepository.find({
            post: filter.post,
        }, ["commenter"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC }
        );

        return await this.taskService.executeDeserializeTreeTask(comments);
    }

    async update(update: UpdateCommentDto, id: string, user: User) {
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

        this.commentRepository.flush();
        return comment;
        
    }

    async delete(id: string, user: User) {
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
        
        this.commentRepository.flush();
        return comment;
    }

}