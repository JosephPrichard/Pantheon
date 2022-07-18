/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity} from "./post.entity";
import { CreatePostDto, PostFilterDto, UpdatePostDto } from "./post.dto";
import { FilterQuery, QueryOrder, QueryOrderMap } from "mikro-orm";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { ForumService } from "../forum/forum.service";
import { ForumNotFoundException, PostNotFoundException } from "src/exception/entityNotFound.exception";
import { ResourcePermissionsException } from "src/exception/permissions.exception";
import { AppLogger } from "src/loggers/applogger";
import { InvalidInputException } from "src/exception/invalidInput.exception";

@Injectable()
export class PostService {

    private readonly logger = new AppLogger(PostService.name);

    constructor(
        @InjectRepository(PostEntity) 
        private readonly postRepository: EntityRepository<PostEntity>,

        private readonly forumService: ForumService,

        private readonly userService: UserService
    ) {}

    async create(post: CreatePostDto, poster: User) {
        const forum = await this.forumService.findById(post.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        if (post.images && post.images.length < 1) {
            throw new InvalidInputException("Need to upload at least 1 image.");
        }

        const postEntity = new PostEntity();

        postEntity.forum = forum;

        postEntity.title = post.title;
        if (post.content) {
            postEntity.content = post.content;
        } else if (post.images) {
            postEntity.images = post.images;
        } else if (post.link) {
            postEntity.link = post.link;
        } else {
            throw new InvalidInputException("Needs to contain images, link, or content");
        }
        postEntity.poster = this.userService.getEntityReference(poster.id);

        await this.postRepository.persistAndFlush(postEntity);

        this.logger.log(`User ${poster.id} created a post ${postEntity.id}`);
        return postEntity;
    }

    async findById(id: number) {
        return await this.postRepository.findOne({ id: id }, ["poster", "forum"]);
    }

    async findByFilter(filter: PostFilterDto) {
        const where: FilterQuery<any> = {};

        // check if we want to filter poster
        if (filter.poster) {
            where.poster = filter.poster;
        } else {
            where.poster = { $ne: null };
        }

        // check if we want to filter forums
        if (filter.forums) {
            if (filter.forums.length === 1) {
                // filter out posts for a single forum
                where.forum = filter.forums[0];
            } else {
                // filter out posts for a few forums
                where.forum = { $in: filter.forums };
            }
        }

        let sort: QueryOrderMap = { id: QueryOrder.DESC };
        // check if we should use cursors to paginate
        if (filter.afterCursor) {
            where.id = { $lt: filter.afterCursor };
        } else if (filter.beforeCursor) {
            where.id = { $gt: filter.beforeCursor };
            sort = { id: QueryOrder.ASC };
        }

        // fetch posts from the repository
        const posts = await this.postRepository.find(
            where,
            ["poster", "forum"],
            sort,
            filter.perPage + 1
        );

        // if the before cursor was used, reverse list (since it fetches backwards)
        if (!filter.afterCursor && filter.beforeCursor) {
            posts.reverse();
        }

        // remove the extra element from the list
        const nextPage = posts.length >= filter.perPage + 1;
        if (nextPage) {
            posts.pop();
        }

        return { posts, nextPage };
    }

    async update(update: UpdatePostDto, id: number, user: User) {
        const post = await this.findById(id);
        if (!post) {
            throw new PostNotFoundException();
        }

        const userMatches = post.poster?.id === user.id;
        if (!userMatches) {
            throw new ResourcePermissionsException();
        }

        if (post.content) {
            post.content = update.content;
        }

        await this.postRepository.flush();

        this.logger.log(`User ${user.id} updated post ${post.id}`);
        return post;
    }

    async delete(id: number, user: User) {
        const post = await this.findById(id);
        if (!post) {
            throw new PostNotFoundException();
        }

        const userMatches = post?.poster?.id === user.id;
        if (!userMatches) {
            throw new ResourcePermissionsException();
        }

        post.poster = null;
        post.content = "";
        post.images = [];

        await this.postRepository.flush();

        this.logger.log(`User ${user.id} deleted post ${post.id}`);
        return post;
    }

    async deleteAll(user: User) {
        const count = await this.postRepository.nativeUpdate(
            { poster: user.id },
            { poster: null, content: "", images: [] }
        );
        this.logger.log(`User ${user.id}'s posts were deleted`);
        return count;
    }
}
