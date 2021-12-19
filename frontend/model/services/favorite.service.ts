import { Favorite } from "../entities/favorite.entity";
import { User } from "../entities/user.entity"
import { getOrm } from "../orm";
import PostService from "./post.service";

export const FavoriteService = {
    async create(postId: string, user: User) {
        const orm = await getOrm();

        const favoriteEntity = new Favorite();

        const favorite = await orm.em.findOne(Favorite, { post: postId, user: user });
        if (favorite) {
            return undefined;
        }

        const post = await PostService.findById(postId);
        if (post) {
            favoriteEntity.post = post;
            favoriteEntity.user = user;
        }

        return favoriteEntity;
    },

    async findByUser(user: User) {
        const orm = await getOrm();

        const favorites = await orm.em.find(Favorite, {
            user: user
        }, ["post", "post.user"]);
        return favorites;
    },

    async delete(postId: string, user: User) {
        const orm = await getOrm();

        const favorite = await orm.em.findOne(Favorite, { post: postId, user: user });

        if(favorite) {
            orm.em.removeAndFlush(favorite);
        }

        return favorite;
    }
}

export default FavoriteService;