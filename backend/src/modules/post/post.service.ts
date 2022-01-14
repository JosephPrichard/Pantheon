import { PostEntity } from "./post.entity";
import { PostFilter, CreatePostDto, UpdatePostDto } from "./post.dto";
import { QueryOrder, QueryOrderMap } from "mikro-orm";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { ForumService } from "../forum/forum.service";
import { PermissionsService } from "../permissions/permissions.service";
import { ForumNotFoundException, PostNotFoundException } from "src/exception/entityNotFound.exception";
import { BannedException, ResourcePermissionsException } from "src/exception/permissions.exception";
import { AppLogger } from "src/loggers/applogger";
import { countPages, pageOffset, PER_PAGE } from "src/utils/paginator";

@Injectable()
export class PostService {

    private readonly logger = new AppLogger(PostService.name);

    constructor(
        @InjectRepository(PostEntity) 
        private readonly postRepository: EntityRepository<PostEntity>,

        private readonly permsService: PermissionsService,

        private readonly forumService: ForumService,

        private readonly userService: UserService 
    ) {}

    async create(post: CreatePostDto, poster: User) {
        const forum = await this.forumService.findById(post.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.isBanned(forum, poster);
        if (!hasPerms) {
            throw new BannedException();
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
        }
        postEntity.poster = this.userService.getEntityReference(poster.id);

        await this.postRepository.persistAndFlush(postEntity);

        this.logger.log(`User ${poster.id} created a post ${postEntity.id}`);
        return postEntity.id;
    }

    async findById(id: string) {
        return await this.postRepository.findOne({ id: id }, ["poster"]);
    }

    async findManyByIds(ids: string[]) {
        return await this.postRepository.find({ id: { $in: ids } });
    }

    async findByFilter(filter: PostFilter) {
        const where: any = {};
        if (filter.poster) {
            where.poster = filter.poster;
        }
        if (filter.forums) {
           if (filter.forums.length === 1) {
                where.forum = filter.forums[0];
           } else {
                where.forum = { $in: filter.forums };
           }
        }
        if (filter.date) {
            where.createdAt = { 
                $gte: filter.date
            }
        }

        let sort: QueryOrderMap;
        if (filter.sort === "hot") {
            sort = { hotRank: QueryOrder.DESC };
        } else if (filter.sort === "top") {
            sort = { votes: QueryOrder.DESC };
        } else {
            sort = { createdAt: QueryOrder.DESC };
        }

        const [posts, count] = await this.postRepository.findAndCount(
            where,
            ["poster"],
            sort,
            PER_PAGE,
            pageOffset(filter.page)
        );

        return { 
            posts, 
            pageCount: countPages(count)
        };
    }

    async update(update: UpdatePostDto, id: string, user: User) {
        const post = await this.findById(id);
        if (!post) {
            throw new PostNotFoundException();
        }

        const userMatches = post.poster?.id === user.id;
        if (!userMatches) {
            throw new ResourcePermissionsException();
        }

        if (post.content && update.content) {
            post.content = update.content;
        } else if (post.images.length > 1 && update.images) {
            post.images = update.images;
        } else if (post.link && update.link) {
            post.link = update.link;
        }

        await this.postRepository.flush();

        this.logger.log(`User ${user.id} updated post ${post.id}`);
        return post;
    }

    async delete(id: string, user: User) {
        const post = await this.findById(id);
        if (!post) {
            throw new PostNotFoundException();
        }

        const userMatches = post?.poster?.id === user.id;
        const hasModPerms = await this.permsService.hasModPerms(post.forum, user);
        if (!userMatches && !hasModPerms) {
            throw new ResourcePermissionsException();
        }

        post.poster = null;
        post.title = "";
        post.content = "";
        post.images = [];

        await this.postRepository.flush();

        this.logger.log(`User ${user.id} deleted post ${post.id}`);
        return post;
    }

}
