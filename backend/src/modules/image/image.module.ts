import { Module } from "@nestjs/common";
import { ForumModule } from "../forum/forum.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
    imports: [PermissionsModule, ForumModule],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule {}