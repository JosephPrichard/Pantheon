import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { BanEntity } from "../ban/ban.entity";
import { ModeratorEntity } from "../moderator/moderator.entity";
import { PermissionsService } from "./permissions.service";

@Module({
    imports: [MikroOrmModule.forFeature([ModeratorEntity, BanEntity])],
    exports: [PermissionsService],
    providers: [PermissionsService]
})
export class PermissionsModule {}