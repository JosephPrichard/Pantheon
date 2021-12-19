import { Entity, ManyToOne, PrimaryKeyType } from "mikro-orm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
class Favorite {
    @ManyToOne({ entity: () => User, primary: true })    
    user!: User;

    @ManyToOne({ entity: () => Post, primary: true })
    post!: Post;

    [PrimaryKeyType]: [string, string];
}

export { Favorite };
