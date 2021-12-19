import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserCredsEntity, UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [MikroOrmModule.forFeature([UserCredsEntity, UserEntity])],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}