import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ModeratorEntity } from "../moderator/moderator.entity";
import { PermissionsModule } from "../permissions/permissions.module";
import { UserModule } from "../user/user.module";
import { ForumController } from "./forum.controller";
import { ForumEntity } from "./forum.entity";
import { ForumService } from "./forum.service";

@Module({
    imports: [MikroOrmModule.forFeature([ForumEntity, ModeratorEntity]), UserModule, PermissionsModule],
    exports: [ForumService],
    controllers: [ForumController],
    providers: [ForumService],
})
export class ForumModule {}