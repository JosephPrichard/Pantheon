import { ForumEntity } from "./forum";
import { UserEntity } from "./user";

export interface SubscribtionEntity {
    forum: ForumEntity;
    user: UserEntity;
    isFavorite: boolean;
}

