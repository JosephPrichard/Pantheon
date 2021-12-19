import { Entity, Index, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { Post } from "./post.entity";
import { User } from "./user.entity";
import { MAX_COMMENT_LEN, MAX_PATH_LEN } from "../global";
import { uuid } from "../utils/id";

// uses the materialized paths way of storing a tree in a relational database

@Entity()
@Index({ properties: ["post", "path"] })
class Comment {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @ManyToOne({ entity: () => User, nullable: true })
    @Index()
    commenter: User | null = null;

    @ManyToOne({ entity: () => Post })
    post!: Post;

    @Property({ type: String, length: MAX_PATH_LEN })
    @Index()
    path: string = ""; // delimited string containing id's of other comments

    @Property({ type: Number })
    votes: number = 0;

    @Property({ type: String, length: MAX_COMMENT_LEN })
    content!: string;

    @Property({ type: Date })
    createdAt: Date = new Date();
}

export { Comment };
