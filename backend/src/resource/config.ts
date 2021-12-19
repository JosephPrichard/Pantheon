import { LoadStrategy, Options, ReflectMetadataProvider } from "mikro-orm";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { FavoriteEntity } from "../modules/favorite/favorite.entity";
import { PostEntity } from "../modules/post/post.entity";
import { UserEntity, UserCredsEntity } from "../modules/user/user.entity";
import { PostVoteEntity, CommentVoteEntity } from "../modules/vote/vote.entity";
import { CommentEntity } from "../modules/comment/comment.entity";
import { CircleEntity } from "../modules/circle/circle.entity";
import { SubscriptionEntity } from "src/modules/subscription/subscription.entity";
import { ModeratorEntity } from "src/modules/moderator/moderator.entity";

require("dotenv").config();

export const ormConfig: Options<PostgreSqlDriver> = {
    type: "postgresql",
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    metadataProvider: ReflectMetadataProvider,
    entities: [
        UserEntity, 
        UserCredsEntity, 
        CircleEntity, 
        SubscriptionEntity,
        ModeratorEntity,
        PostEntity, 
        PostVoteEntity, 
        FavoriteEntity, 
        CommentEntity, 
        CommentVoteEntity,
    ],
    loadStrategy: LoadStrategy.JOINED,
    pool: { min: 0, max: 15 }
};

export const redisHost = process.env.REDIS_HOST;
export const sessionSecret = process.env.SESSION_SECRET ?? "";