import { Entity,  ManyToOne, PrimaryKeyType, Property } from "mikro-orm";
import { CommentEntity } from "../comment/comment.entity";
import { PostEntity } from "../post/post.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "comment_votes" })
export class CommentVoteEntity {
    @ManyToOne({ entity: () => CommentEntity, primary: true })
    comment!: CommentEntity;

    @ManyToOne({ entity: () => UserEntity, primary: true })
    voter!: UserEntity;

    @ManyToOne({ entity: () => PostEntity })
    post!: PostEntity;

    @Property({ type: Number })
    value!: number; // -1, 0, or 1

    [PrimaryKeyType]: [string, string];
}

@Entity({ tableName: "post_votes" })
export class PostVoteEntity {
    @ManyToOne({ entity: () => PostEntity, primary: true })
    post!: PostEntity;

    @ManyToOne({ entity: () => UserEntity, primary: true })
    voter!: UserEntity;

    @Property({ type: Number })
    value!: number; // -1, 0, or 1

    [PrimaryKeyType]: [string, string];
}