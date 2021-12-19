import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CircleModule } from "../circle/circle.module";
import { UserModule } from "../user/user.module";
import { ModeratorController } from "./moderator.controller";
import { ModeratorEntity } from "./moderator.entity";
import { ModeratorService } from "./moderator.service";

@Module({
    imports: [MikroOrmModule.forFeature([ModeratorEntity]), CircleModule, UserModule],
    exports: [ModeratorService],
    controllers: [ModeratorController],
    providers: [ModeratorService]
})
export class ModeratorModule {}