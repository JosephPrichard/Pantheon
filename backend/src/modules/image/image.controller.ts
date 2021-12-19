import { Controller, Param, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { ImageService } from "./image.service";
import { SESSION_ERROR } from "../../utils/global";
import * as multer from "multer";
import path from "path";

MulterModule.register({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
            return callback(new Error("Only images are allowed"), false)
        }
        callback(null, true)
    },
    limits: {
        files: 10,
        fileSize: 1024 * 1024 // about 1024 KiB
    }
});

@Controller("images")
export class ImageController {

    constructor(private readonly imageService: ImageService) {}

    @Post("/upload/assets")
    @UseInterceptors(AnyFilesInterceptor())
    async uploadAssets(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Res() res: Response
    ) {
        try {
            const result = await this.imageService.uploadImages(files, "assets");
            res.json({ images: result });
        } catch(err) {
            res.json({ err });
        }
    }

    @Post("/upload/avatars")
    @UseInterceptors(FileInterceptor("avatar"))
    async uploadAvatar(
        @UploadedFiles() file: Express.Multer.File,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        try {
            const result = await this.imageService.uploadImage(file, "avatars", user.id);
            res.json({ images: result });
        } catch(err) {
            res.json({ err });
        }
    }

    @Post("/download/:folder/:id")
    async download(
        @Param() folderParam: string,
        @Param() idParam: string,
        @Res() res: Response
    ) {
        const { downloadStream, metadata } = this.imageService.downloadImage(folderParam + idParam);

        res.setHeader("Content-Type", metadata.contentType);
    
        downloadStream.on("data", (chunk) => {
            res.write(chunk);
        });

        downloadStream.on("end", () => {
            downloadStream.destroy();
            res.end();
        });

        downloadStream.on("error", () => {
            res.status(404).json({ err: "Image not found" });
        });
    }
}
