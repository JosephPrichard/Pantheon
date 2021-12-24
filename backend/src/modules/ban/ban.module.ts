import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { BanController } from "./ban.controller";
import { BanEntity } from "./ban.entity";
import { BanService } from "./ban.service";

@Module({
    imports: [MikroOrmModule.forFeature([BanEntity]), UserModule],
    exports: [BanService],
    controllers: [BanController],
    providers: [BanService]
})
export class BanModule {}