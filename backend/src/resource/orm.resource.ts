/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { LoadStrategy, Options, ReflectMetadataProvider } from "mikro-orm";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { PostEntity } from "../modules/post/post.entity";
import { UserEntity, UserCredsEntity } from "../modules/user/user.entity";
import { PostVoteEntity, CommentVoteEntity } from "../modules/vote/vote.entity";
import { CommentEntity } from "../modules/comment/comment.entity";
import { ForumEntity } from "../modules/forum/forum.entity";
import { SubscriptionEntity } from "src/modules/subscription/subscription.entity";
import { HighlightEntity } from "src/modules/highlight/highlight.entity";
import { NotificationEntity } from "../modules/notifications/notification.entity";

require("dotenv").config();

export const ormConfig: Options<PostgreSqlDriver> = {
    type: "postgresql",
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    metadataProvider: ReflectMetadataProvider,
    debug: true,
    entities: [
        UserEntity, 
        UserCredsEntity, 
        ForumEntity, 
        SubscriptionEntity,
        HighlightEntity,
        NotificationEntity,
        PostEntity, 
        PostVoteEntity,
        CommentEntity, 
        CommentVoteEntity,
    ],
    loadStrategy: LoadStrategy.JOINED,
    pool: { min: 0, max: 15 },
};