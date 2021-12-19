import { Module } from "@nestjs/common";
import { PostModule } from "../post/post.module";
import { VoteModule } from "../vote/vote.module";
import { FeedController } from "./feed.controller";

@Module({
    imports: [PostModule, VoteModule],
    controllers: [FeedController],
})
export class FeedModule {}