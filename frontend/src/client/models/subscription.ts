import { ForumEntity } from "./forum";
import { UserEntity } from "./user";

export interface SubscriptionEntity {
    forum: ForumEntity;
    user: UserEntity;
    isFavorite: boolean;
}

