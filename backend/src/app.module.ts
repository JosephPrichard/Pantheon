import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import session from 'express-session';
import { ormConfig, redisHost, sessionSecret } from './resource/config';
import * as redis from "redis";
import connectRedis from 'connect-redis';
import { SESSION_EXPIRY } from './utils/global';
import { CommentModule } from './modules/comment/comment.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';
import { ImageModule } from './modules/image/image.module';
import { CircleModule } from './modules/circle/circle.module';
import { ModeratorModule } from './modules/moderator/moderator.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { FeedModule } from './modules/feed/feed.module';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

@Module({
    imports: [
        MikroOrmModule.forRoot(ormConfig),

        UserModule,
        ModeratorModule,
        CircleModule,
        ImageModule,

        PostModule,

        FavoriteModule,
        CommentModule,
        SubscriptionModule,

        VoteModule,

        FeedModule
    ]
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    store: new RedisStore({
                        host: redisHost,
                        port: 6379,
                        client: redisClient,
                        ttl: SESSION_EXPIRY
                    }),
                    secret: sessionSecret,
                    saveUninitialized: false,
                    resave: true,
                    rolling: true,
                    cookie: {
                        secure: false,
                        httpOnly: true,
                        maxAge: SESSION_EXPIRY * 1000
                    }
                })
            )
            .forRoutes({ 
                path: "*", 
                method: RequestMethod.ALL 
            });
      }
}