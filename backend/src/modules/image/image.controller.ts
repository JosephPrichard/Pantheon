import { BadRequestException, Controller, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { Image, ImageService } from "./image.service";
import * as multer from "multer";
import path from "path";
import { InvalidSessionException } from "src/exception/session.exception";

@Controller("images")
export class ImageController {

    constructor(private readonly imageService: ImageService) {}

    @Post("/upload/assets")
    @UseInterceptors(AnyFilesInterceptor({
        storage: multer.memoryStorage(),
        fileFilter: async (req, file, callback) => {
            const ext = path.extname(file.originalname);
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
                return callback(new BadRequestException("Only images are allowed"), false);
            }
            callback(null, true);
        },
        limits: {
            files: 10,
            fileSize: 1024 * 1024 // 1024 KiB
        }
    }))
    async uploadAssets(
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        const images = await this.imageService.uploadImages(files, "assets");
        return { images };
    }

    @Post("/upload/avatars")
    @UseInterceptors(FileInterceptor("avatar", {
        storage: multer.memoryStorage(),
        fileFilter: async (req, file, callback) => {
            const ext = path.extname(file.originalname);
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
                return callback(new BadRequestException("Only images are allowed"), false);
            }
            callback(null, true);
        },
        limits: {
            files: 1,
            fileSize: 512 * 1024 // 512 KiB
        }
    }))
    async uploadAvatar(
        @UploadedFiles() file: Express.Multer.File,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const image = await this.imageService.uploadImage(file, "avatars", user.id);
        return { image };
    }
}
