/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Entity, ManyToOne, PrimaryKeyType, Property } from "mikro-orm";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "subscriptions" })
export class SubscriptionEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    user!: UserEntity;

    @ManyToOne({ entity: () => ForumEntity, primary: true })
    forum!: ForumEntity;

    @Property({ type: Boolean })
    isFavorite: boolean = false;

    [PrimaryKeyType]: [Number, String];
}
