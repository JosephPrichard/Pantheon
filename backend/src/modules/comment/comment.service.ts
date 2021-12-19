import { CommentEntity } from "./comment.entity";
import { CreateCommentNodeDto, IdAndCommenterQuery, CreateCommentRootDto, SearchCommentDto, UpdateCommentDto, SearchCommentTreeDto } from "./comment.dto";
import { QueryOrder } from "mikro-orm";
import { UserEntity } from "../user/user.entity";
import { NodeSerializer } from "../../utils/serializer";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository} from "@mikro-orm/nestjs";
import { PostService } from "../post/post.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity) 
        private readonly commentRepository: EntityRepository<CommentEntity>,

        private readonly userService: UserService,

        private readonly postService: PostService
    ) {}

    async createRoot(root: CreateCommentRootDto, commenter: User) {
        const commentEntity = new CommentEntity();
        commentEntity.content = root.content;
        commentEntity.commenter = this.userService.getEntityReference(commenter.id);

        const post = await this.postService.findById(root.post);
        if (post) {
            commentEntity.post = post;
            post.comments += 1;
        } else {
            return;
        }

        this.commentRepository.persistAndFlush(commentEntity);
        return commentEntity.id;
    }

    async createNode(node: CreateCommentNodeDto, commenter: User) {
        const commentEntity = new CommentEntity();
        commentEntity.content = node.content;
        commentEntity.commenter = this.userService.getEntityReference(commenter.id);

        const parent = await this.findById(node.parentComment);
        if (parent) {
            commentEntity.path = NodeSerializer.appendNode(parent.path, parent.id);
            commentEntity.post = parent.post;
            parent.post.comments += 1;
        } else {
            return undefined;
        }

        this.commentRepository.persistAndFlush(commentEntity);
        return commentEntity.id;
    }

    async findById(id: string) {
        return await this.commentRepository.findOne({ id: id }, ["commenter"]);
    }

    async findManyByIds(ids: string[]) {
        return await this.commentRepository.findOne({ id: { $in: ids } });
    }

    async findTreesByFilter(filter: SearchCommentTreeDto) {
        const roots = await this.commentRepository.find({
            post: filter.post,
            path: ""
        }, ["commenter"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC }
        );

        let rootPaths = "";
        for(let i = 0; i < roots.length - 1; i++) {
            const root = roots[i];
            rootPaths += "'" + root.id + "%', ";
        }
        if(roots.length - 1 >= 0) {
            rootPaths += "'" + roots[roots.length - 1].id + "%'";
        }

        const qb = this.commentRepository.createQueryBuilder("c");
        const query = qb.select("*")
            .leftJoinAndSelect("commenter", "u")
            .where(`c.path like any (array[${rootPaths}])`)

        const nodes = await query.execute();
        console.log(nodes);

        return [];
    }

    async findTreeByPath(path: string[]) {
        // find all nodes under the path
        const compare = NodeSerializer.serializePath(path) + "%";
        return await this.commentRepository.find({ path: { $like: compare } }, ["commenter"]);
    }

    async findByFilter(filter: SearchCommentDto) {
        const perPage = 15;

        const comments = await this.commentRepository.find(
            { commenter: filter.commenter },
            ["commenter"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            perPage,
            (filter.page - 1) * perPage
        );

        return comments;
    }

    async findByIdAndCommenter(query: IdAndCommenterQuery) {
        return await this.commentRepository.findOne({ id: query.id, commenter: query.commenter.id });
    }

    async update(query: IdAndCommenterQuery, update: UpdateCommentDto) {
        const comment = await this.findByIdAndCommenter(query);
        if (comment) {
            if (update.content) {
                comment.content = update.content;
            }

            this.commentRepository.flush();
            return comment;
        }
        
    }

    async delete(query: IdAndCommenterQuery) {
        const comment = await this.findByIdAndCommenter(query);
        if (comment) {
            comment.commenter = null;
            comment.content = "";
            
            this.commentRepository.flush();
            return comment;
        }
    }

}