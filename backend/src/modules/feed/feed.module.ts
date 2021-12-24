import { Module } from "@nestjs/common";
import { CommentModule } from "../comment/comment.module";
import { PostModule } from "../post/post.module";
import { VoteModule } from "../vote/vote.module";
import { FeedController } from "./feed.controller";

@Module({
    imports: [PostModule, CommentModule, VoteModule],
    controllers: [FeedController],
})
export class FeedModule {}