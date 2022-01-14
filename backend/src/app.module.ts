import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BadRequestException, MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ormConfig } from './resource/orm';
import { SESSION_SECRET } from './resource/session';
import { SESSION_EXPIRY } from './utils/global';
import { CommentModule } from './modules/comment/comment.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';
import { ImageModule } from './modules/image/image.module';
import { ForumModule } from './modules/forum/forum.module';
import { ModeratorModule } from './modules/moderator/moderator.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { FeedModule } from './modules/feed/feed.module';
import { APP_PIPE } from '@nestjs/core';
import { SearchModule } from './modules/search/search.module';
import { getErrorArr } from './utils/errors';
import session from "express-session";
import connectPgSimple from 'connect-pg-simple';

const PgSession = connectPgSimple(session);

@Module({
    imports: [
        MikroOrmModule.forRoot(ormConfig),

        UserModule,
        ModeratorModule,
        ForumModule,
        ImageModule,

        PostModule,

        FavoriteModule,
        CommentModule,
        SubscriptionModule,

        VoteModule,

        FeedModule,
        SearchModule
    ],
    providers: [{
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            transform: true,
            exceptionFactory: (errs) => {
                return new BadRequestException(getErrorArr(errs))
            }
        })
    }],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    // store: new PgSession({
                    //     conString: "",
                    //     tableName: "sessions"
                    // }),
                    secret: SESSION_SECRET,
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