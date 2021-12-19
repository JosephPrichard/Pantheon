import { PostEntity } from "./post.entity";
import { PostFilter, CreatePostDto, IdAndPosterQuery, UpdatePostDto } from "./post.dto";
import { QueryOrder } from "mikro-orm";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CircleService } from "../circle/circle.service";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity) 
        private readonly postRepository: EntityRepository<PostEntity>,

        private readonly circleService: CircleService,

        private readonly userService: UserService 
    ) {}

    async create(post: CreatePostDto, poster: User) {
        const postEntity = new PostEntity();

        const circle = await this.circleService.findById(post.circle);
        if (circle) {
            postEntity.circle = circle;
        } else {
            return;
        }

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

    async findByIdAndPoster(query: IdAndPosterQuery) {
        return await this.postRepository.findOne({ id: query.id, poster: query.poster.id });
    }

    async update(query: IdAndPosterQuery, update: UpdatePostDto) {
        const post = await this.findByIdAndPoster(query);
        if (post) {
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

    async delete(query: IdAndPosterQuery) {
        const post = await this.findByIdAndPoster(query);
        if (post) {
            post.poster = null;
            post.title = "";
            post.content = "";
            post.images = [];
        }
        await this.postRepository.flush();
        return post;
    }

}
