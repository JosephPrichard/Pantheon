import { FavoriteEntity } from "./favorite.entity";
import { UserEntity } from "../user/user.entity"
import { PostService } from "../post/post.service";
import { Dependencies, Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "mikro-orm";
import { User } from "../user/user.dto";
import { CreateFavoriteDto } from "./favorite.dto";
import { UserService } from "../user/user.service";
import { PostNotFoundException, FavoriteNotFoundException } from "src/exception/entityNotFound.exception";
import { DuplicateResourceException } from "src/exception/invalidInput.exception";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteEntity) 
        private readonly favoriteRepository: EntityRepository<FavoriteEntity>,

        private readonly userService: UserService,

        private readonly postService: PostService
    ) {}

    async create(favorite: CreateFavoriteDto, user: User) {
        const oldFavoriteEntity = await this.favoriteRepository.findOne({ post: favorite.post, user: user });
        if (oldFavoriteEntity) {
            throw new DuplicateResourceException();
        }

        const post = await this.postService.findById(favorite.post);
        if (!post) {
            throw new PostNotFoundException();
        }

        const favoriteEntity = new FavoriteEntity();

        favoriteEntity.post = post;
        favoriteEntity.user = this.userService.getEntityReference(user.id);

        this.favoriteRepository.persistAndFlush(favoriteEntity);
        return favoriteEntity;
    }

    async findByUser(user: User) {
        const favorites = await this.favoriteRepository.find({
            user: user.id
        }, ["post", "post.user"]);

        return favorites;
    }

    async delete(post: string, user: User) {
        const favorite = await this.favoriteRepository.findOne({ post: post, user: user.id });
        if (!favorite) {
            throw new FavoriteNotFoundException();
        }

        this.favoriteRepository.removeAndFlush(favorite);
        return favorite;
    }
}