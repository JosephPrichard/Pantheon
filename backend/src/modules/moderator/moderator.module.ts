import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ForumModule } from "../forum/forum.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { UserModule } from "../user/user.module";
import { ModeratorController } from "./moderator.controller";
import { ModeratorEntity } from "./moderator.entity";
import { ModeratorService } from "./moderator.service";

@Module({
    imports: [MikroOrmModule.forFeature([ModeratorEntity]), ForumModule, UserModule, PermissionsModule],
    exports: [ModeratorService],
    controllers: [ModeratorController],
    providers: [ModeratorService]
})
export class ModeratorModule {}