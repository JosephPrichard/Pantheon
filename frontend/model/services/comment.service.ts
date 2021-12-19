import PostService from "./post.service";
import { Comment } from "../entities/comment.entity";
import { CommentFilter, CommentNodeInput, CommentQuery, CommentRootInput, CommentTreeFilter, CommentUpdate } from "../interfaces/comment";
import { MikroORM, QueryOrder } from "mikro-orm";
import { User } from "../entities/user.entity";
import { getOrm } from "../orm";
import { NodeSerializer } from "../utils/serializer";

const CommentService = {
    async createRoot(root: CommentRootInput, commenter: User) {
        const orm = await getOrm();

        const comment = new Comment();
        comment.content = root.content;
        comment.commenter = commenter;

        const post = await PostService.findById(root.post);
        if (post) {
            comment.post = post;
            post.comments += 1;
        } else {
            return undefined;
        }

        orm.em.persistAndFlush(comment);
        return comment.id;
    },

    async createNode(node: CommentNodeInput, commenter: User) {
        const orm = await getOrm();

        const comment = new Comment();
        comment.content = node.content;
        comment.commenter = commenter;

        const parent = await CommentService.findById(node.parentComment);
        if (parent) {
            comment.path = NodeSerializer.appendNode(parent.path, parent.id);
            comment.post = parent.post;
            parent.post.comments += 1;
        } else {
            return undefined;
        }

        orm.em.persistAndFlush(comment);
        return comment.id;
    },

    async findById(id: string) {
        const orm = await getOrm();

        return await orm.em.findOne(Comment, { id: id }, ["commenter"]);
    },

    async findManyByIds(ids: string[]) {
        const orm = await getOrm();

        return await orm.em.findOne(Comment, { id: { $in: ids } });
    },

    async findTreesByFilter(filter: CommentTreeFilter) {
        const orm = await getOrm();

        const roots = await orm.em.find(Comment, {
            post: filter.post,
            path: ""
        }, ["commenter"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            filter.limit,
            filter.skip
        );

        let rootPaths = "";
        for(let i = 0; i < roots.length - 1; i++) {
            const root = roots[i];
            rootPaths += "'" + root.id + "%', ";
        }
        if(roots.length - 1 >= 0) {
            rootPaths += "'" + roots[roots.length - 1].id + "%'";
        }

        console.log(rootPaths);

        const qb = orm.em.createQueryBuilder(Comment, "c");
        const query = qb.select("*")
            .leftJoinAndSelect("commenter", "u")
            .where(`c.path like any (array[${rootPaths}])`)

        console.log(query.getQuery());

        const nodes = await query.execute();
        console.log(nodes);

        return [];
    },

    async findTreeByPath(path: string[]) {
        const orm = await getOrm();
        // find all nodes under the path
        const compare = NodeSerializer.serializePath(path) + "%";
        return await orm.em.find(Comment, { path: { $like: compare } }, ["commenter"]);
    },

    async findByFilter(filter: CommentFilter) {
        const orm = await getOrm();

        const comments = await orm.em.find(Comment,
            { commenter: filter.commenter },
            ["commenter"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            filter.limit,
            filter.skip
        );
        return comments;
    },

    async findByIdAndCommenter(commentQuery: CommentQuery) {
        const orm = await getOrm();
        return await orm.em.findOne(Comment, { id: commentQuery.id, commenter: commentQuery.commenter });
    },

    async update(commentQuery: CommentQuery, commentUpdate: CommentUpdate) {
        const orm = await getOrm();

        const comment = await CommentService.findByIdAndCommenter(commentQuery);
        if (comment) {
            if (commentUpdate.content) {
                comment.content = commentUpdate.content;
            }
        }
        orm.em.flush();
        return comment;
    },

    async delete(commentQuery: CommentQuery) {
        const orm = await getOrm();

        const comment = await CommentService.findByIdAndCommenter(commentQuery);
        if (comment) {
            comment.commenter = null;
            comment.content = "";
        }
        orm.em.flush();
        return comment;
    }
};

export default CommentService;
