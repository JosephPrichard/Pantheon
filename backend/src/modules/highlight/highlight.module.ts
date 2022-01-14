import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { SubscriptionModule } from "../subscription/subscription.module";
import { UserModule } from "../user/user.module";
import { HighlightEntity } from "./highlight.entity";
import { HighlightService } from "./highlight.service";

@Module({
    imports: [MikroOrmModule.forFeature([HighlightEntity]), UserModule, SubscriptionModule],
    exports: [HighlightService],
    providers: [HighlightService]
})
export class HighlightModule {}