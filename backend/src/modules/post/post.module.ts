import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ForumModule } from "../forum/forum.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { UserModule } from "../user/user.module";
import { PostController } from "./post.controller";
import { PostEntity } from "./post.entity";
import { PostService } from "./post.service";

@Module({
    imports: [MikroOrmModule.forFeature([PostEntity]), PermissionsModule, ForumModule, UserModule],
    exports: [PostService],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}