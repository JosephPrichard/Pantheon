import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BadRequestException, MiddlewareConsumer, Module, RequestMethod, UseInterceptors, ValidationError, ValidationPipe } from '@nestjs/common';
import { ormConfig, sessionSecret } from './resource/config';
import session from "express-session";
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

function getErrorArr(errs: ValidationError[]) {
    const response = [];
    for (const err of errs) {
        const errors = [];
        for (const k in err.constraints) {
            errors.push(err.constraints[k]);
        }
        response.push({
            property: err.property,
            errors
        });
    }
    return response;
}

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

        FeedModule
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