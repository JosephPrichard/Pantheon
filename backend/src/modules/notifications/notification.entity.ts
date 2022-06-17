/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Entity, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { UserEntity } from "../user/user.entity";
import { CommentEntity } from "../comment/comment.entity";
import { PostEntity } from "../post/post.entity";

@Entity({ tableName: "notifications" })
export class NotificationEntity {
    @PrimaryKey({ type: Number })
    id!: number;

    @ManyToOne({ entity: () => UserEntity })
    recipient!: UserEntity;

    @ManyToOne({ entity: () => CommentEntity })
    comment!: CommentEntity;

    @Property({ type: Boolean })
    read: boolean = false;
}