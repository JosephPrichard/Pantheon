/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BadRequestException, MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ormConfig } from './resource/orm.resource';
import { SESSION_SECRET } from './resource/session.resource';
import { SESSION_EXPIRY, SESSION_PRUNE_PERIOD } from './global';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';
import { FileModule } from './modules/file/file.module';
import { ForumModule } from './modules/forum/forum.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { FeedModule } from './modules/feed/feed.module';
import { NotificationModule } from "./modules/notifications/notification.module";
import { SearchModule } from './modules/search/search.module';
import { AccountModule } from "./modules/account/account.module";
import { APP_PIPE } from '@nestjs/core';
import { getErrorMsg } from './utils/errparse.utils';
import session from "express-session";
import store from "memorystore";

const MemoryStore = store(session);

@Module({
    imports: [
        MikroOrmModule.forRoot(ormConfig),

        UserModule,
        ForumModule,
        FileModule,

        PostModule,

        CommentModule,
        SubscriptionModule,

        NotificationModule,

        VoteModule,

        FeedModule,
        SearchModule,

        AccountModule
    ],
    providers: [{
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            transform: true,
            exceptionFactory: (errs) => {
                return new BadRequestException(getErrorMsg(errs))
            }
        })
    }],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    store: new MemoryStore({
                        checkPeriod: SESSION_PRUNE_PERIOD * 1000 // prune expired entries every 24h
                    }),
                    secret: SESSION_SECRET,
                    saveUninitialized: false,
                    resave: false,
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