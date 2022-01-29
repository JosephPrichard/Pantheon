import { ForumEntity } from "./forum";
import { UserEntity } from "./user";

export interface ModeratorEntity {
    forum: ForumEntity;
    user: UserEntity;
}
