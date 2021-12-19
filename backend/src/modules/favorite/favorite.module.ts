import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { PostModule } from "../post/post.module";
import { UserModule } from "../user/user.module";
import { FavoriteController } from "./favorite.controller";
import { FavoriteEntity } from "./favorite.entity";
import { FavoriteService } from "./favorite.service";

@Module({
    imports: [MikroOrmModule.forFeature([FavoriteEntity]), PostModule, UserModule],
    exports: [FavoriteService],
    controllers: [FavoriteController],
    providers: [FavoriteService]
})
export class FavoriteModule {}