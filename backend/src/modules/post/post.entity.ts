/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ArrayType, Entity, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "mikro-orm";
import { UserEntity } from "../user/user.entity";
import { MAX_LINK_LEN, MAX_POST_LEN, MAX_TITLE_LEN } from "../../global";
import { ForumEntity } from "../forum/forum.entity";
import { calcHotRank } from "src/utils/hotrank.util";

@Entity({ tableName: "posts" })
export class PostEntity {
    @PrimaryKey({ type: Number })
    id!: number;

    @ManyToOne({ entity: () => UserEntity, nullable: true })
    poster!: UserEntity | null;

    @ManyToOne({ entity: () => ForumEntity })
    forum!: ForumEntity;

    @Property({ type: String, length: MAX_TITLE_LEN })
    title!: string;

    @Property({ type: Number })
    votes: number = 0;

    @Property({ type: Number })
    comments: number = 0;

    @Property({ type: String, length: MAX_POST_LEN, nullable: true })
    content: string | null = null;

    @Property({ type: ArrayType })
    images: string[] = [];

    @Property({ type: String, length: MAX_LINK_LEN, nullable: true })
    link: string | null = null;

    @Property({ type: Date })
    createdAt: Date;

    @Property({ type: Number, nullable: true })
    hotRank?: number;

    constructor() {
        const now = new Date();
        this.createdAt = now;
        this.hotRank = calcHotRank(0, now);
    }
}