import { Entity, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { UserEntity } from "../user/user.entity";
import { MAX_COMMENT_LEN, MAX_PATH_LEN } from "../../global";
import { PostEntity } from "../post/post.entity";

// uses the materialized paths way of storing a tree in a relational database

@Entity({ tableName: "comments" })
export class CommentEntity {
    @PrimaryKey({ type: Number })
    id!: number;

    @ManyToOne({ entity: () => UserEntity, nullable: true })
    commenter: UserEntity | null = null;
    
    @ManyToOne({ entity: () => PostEntity })
    post!: PostEntity;

    @Property({ type: String, length: MAX_PATH_LEN })
    path: string = ""; // delimited string containing id's of other comments

    @Property({ type: Number })
    votes: number = 0;

    @Property({ type: String, length: MAX_COMMENT_LEN })
    content!: string;

    @Property({ type: Date })
    createdAt: Date = new Date();
}