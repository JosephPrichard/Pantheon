import { Entity, ManyToOne, PrimaryKeyType } from "mikro-orm";
import { PostEntity } from "../post/post.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "favorites" })
export class FavoriteEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })    
    user!: UserEntity;

    @ManyToOne({ entity: () => PostEntity, primary: true })
    post!: PostEntity;

    [PrimaryKeyType]: [string, string];
}
