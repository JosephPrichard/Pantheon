import { MikroOrmModule } from "@mikro-orm/nestjs";
import { forwardRef, Module } from "@nestjs/common";
import { ModeratorEntity } from "../moderator/moderator.entity";
import { ModeratorModule } from "../moderator/moderator.module";
import { UserModule } from "../user/user.module";
import { CircleController } from "./circle.controller";
import { CircleEntity } from "./circle.entity";
import { CircleService } from "./circle.service";

@Module({
    imports: [MikroOrmModule.forFeature([CircleEntity, ModeratorEntity]), UserModule],
    exports: [CircleService],
    controllers: [CircleController],
    providers: [CircleService],
})
export class CircleModule {}