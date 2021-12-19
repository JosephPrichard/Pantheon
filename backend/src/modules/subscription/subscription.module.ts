import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CircleModule } from "../circle/circle.module";
import { UserModule } from "../user/user.module";
import { SubcriptionController } from "./subscription.controller";
import { SubscriptionEntity } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";

@Module({
    imports: [MikroOrmModule.forFeature([SubscriptionEntity]), CircleModule, UserModule],
    exports: [SubscriptionService],
    controllers: [SubcriptionController],
    providers: [SubscriptionService]
})
export class SubscriptionModule {}