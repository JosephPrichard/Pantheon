import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CommentModule } from "../comment/comment.module";
import { PostModule } from "../post/post.module";
import { UserEntity } from "../user/user.entity";
import { UserModule } from "../user/user.module";
import { VoteController } from "./vote.controller";
import { PostVoteEntity, CommentVoteEntity } from "./vote.entity";
import { VoteService } from "./vote.service";

@Module({
    imports: [MikroOrmModule.forFeature([PostVoteEntity, CommentVoteEntity]), UserModule, CommentModule, PostModule],
    exports: [VoteService],
    controllers: [VoteController],
    providers: [VoteService],
})
export class VoteModule {}