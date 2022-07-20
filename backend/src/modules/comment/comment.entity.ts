/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Entity, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { UserEntity } from "../user/user.entity";
import { MAX_COMMENT_LEN } from "../../global";
import { PostEntity } from "../post/post.entity";

@Entity({ tableName: "comments" })
export class CommentEntity {
    @PrimaryKey({ type: Number })
    id!: number;

    @ManyToOne({ entity: () => UserEntity, nullable: true })
    commenter: UserEntity | null = null;
    
    @ManyToOne({ entity: () => PostEntity })
    post!: PostEntity;

    @Property({ type: Number, nullable: true })
    parentId: number | null = null;

    @Property({ type: Number })
    votes: number = 0;

    @Property({ type: String, length: MAX_COMMENT_LEN })
    content!: string;

    @Property({ type: Date })
    createdAt: Date = new Date();
}