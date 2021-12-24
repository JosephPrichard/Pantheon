import { PostEntity } from "./post.entity";
import { PostFilter, CreatePostDto, UpdatePostDto } from "./post.dto";
import { QueryOrder } from "mikro-orm";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { ForumService } from "../forum/forum.service";
import { PermissionsService } from "../permissions/permissions.service";
import { ForumNotFoundException, PostNotFoundException } from "src/exception/entityNotFound.exception";
import { BannedException, ResourcePermissionsException } from "src/exception/permissions.exception";

@Injectable()
export class PostService {

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

        this.postRepository.persistAndFlush(postEntity);
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
        if (filter.forum) {
            where.forum = filter.forum;
        }
        if (filter.date) {
            where.createdAt = { 
                $gte: filter.date, 
                $lte: new Date()
            }
        }

        const perPage = 15;

        const posts = await this.postRepository.find(
            where,
            ["poster"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            perPage,
            (filter.page - 1) * perPage
        );

        const pageCount = Math.ceil((await this.postRepository.count(where)) / perPage);

        return { 
            posts, 
            pageCount
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

        if (userMatches) {
            if (post.content && update.content) {
                post.content = update.content;
            } else if (post.images.length > 1 && update.images) {
                post.images = update.images;
            } else if (post.link && update.link) {
                post.link = update.link;
            }
            await this.postRepository.flush();
            return post;
        }
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
        return post;
    }

}
