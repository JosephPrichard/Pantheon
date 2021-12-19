import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { PostModule } from "../post/post.module";
import { UserModule } from "../user/user.module";
import { CommentController } from "./comment.controller";
import { CommentEntity } from "./comment.entity";
import { CommentService } from "./comment.service";

@Module({
    imports: [MikroOrmModule.forFeature([CommentEntity]), PostModule, UserModule],
    exports: [CommentService],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}