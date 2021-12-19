import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { PostFilter, PostInput, PostQuery, PostUpdate } from "../interfaces/post";
import { getOrm } from "../orm";
import { MikroORM, QueryOrder } from "mikro-orm";

const PostService = {
    async create(post: PostInput, poster: User) {
        const orm = await getOrm();

        const postEntity = new Post();
        postEntity.title = post.title;
        if (post.content) {
            postEntity.content = post.content;
        } else if (post.images) {
            postEntity.images = post.images;
        } else if (post.link) {
            postEntity.link = post.link;
        }
        postEntity.poster = poster;

        orm.em.persistAndFlush(postEntity);
        return postEntity.id;
    },

    async findById(id: string) {
        const orm = await getOrm();

        return await orm.em.findOne(Post, { id: id }, ["poster"]);
    },

    async findManyByIds(ids: string[]) {
        const orm = await getOrm();

        return await orm.em.find(Post, { id: { $in: ids } });
    },

    async findByIdAndPoster(postQuery: PostQuery) {
        const orm = await getOrm();

        return await orm.em.findOne(Post, { id: postQuery.id, poster: postQuery.poster });
    },

    async findByFilter(filter: PostFilter) {
        const orm = await getOrm();

        const where: any = {};
        if (filter.poster) {
            where.poster = filter.poster;
        }
        if (filter.date) {
            where.createdAt = { 
                $gte: filter.date, 
                $lte: new Date()
            }
        }

        const perPage = 15;

        const posts = await orm.em.find(Post,
            where,
            ["poster"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            perPage,
            (filter.page - 1) * perPage
        );

        const pageCount = Math.ceil((await orm.em.count(Post, where)) / perPage);

        return { 
            posts, 
            pageCount
        };
    },

    async update(postQuery: PostQuery, postUpdate: PostUpdate) {
        const orm = await getOrm();

        const post = await PostService.findByIdAndPoster(postQuery);
        if (post) {
            if (post.content && postUpdate.content) {
                post.content = postUpdate.content;
            } else if (post.images.length > 1 && postUpdate.images) {
                post.images = postUpdate.images;
            } else if (post.link && postUpdate.link) {
                post.link = postUpdate.link;
            }
        }
        await orm.em.flush();
        return post;
    },

    async delete(postQuery: PostQuery) {
        const orm = await getOrm();

        const post = await PostService.findByIdAndPoster(postQuery);
        if (post) {
            post.poster = null;
            post.title = "";
            post.content = "";
            post.images = [];
        }
        await orm.em.flush();
        return post;
    }
};

export default PostService;
