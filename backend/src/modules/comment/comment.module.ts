import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { PermissionsModule } from "../permissions/permissions.module";
import { PostModule } from "../post/post.module";
import { TaskModule } from "../task/task.module";
import { UserModule } from "../user/user.module";
import { CommentController } from "./comment.controller";
import { CommentEntity } from "./comment.entity";
import { CommentService } from "./comment.service";

@Module({
    imports: [
        MikroOrmModule.forFeature([CommentEntity]), 
        PermissionsModule, 
        PostModule, 
        UserModule,
        TaskModule
    ],
    exports: [CommentService],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}