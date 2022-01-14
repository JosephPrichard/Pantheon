import { BadRequestException, Body, Controller, Post, Query, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { ImageService } from "./image.service";
import * as multer from "multer";
import path from "path";
import { InvalidSessionException } from "src/exception/session.exception";
import { ModPermissionsException } from "src/exception/permissions.exception";
import { PermissionsService } from "../permissions/permissions.service";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ForumService } from "../forum/forum.service";
import { ForumNotFoundException } from "src/exception/entityNotFound.exception";
import { UploadForumImageDto } from "./image.dto";

const configMultiple: MulterOptions = {
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
        fileSize: 3.5E6 // 3.5 mb
    }
};

const configSingleSmall: MulterOptions = {
    storage: multer.memoryStorage(),
    fileFilter: async (req, file, callback) => {
        const ext = path.extname(file.originalname);
        if(ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
            return callback(new BadRequestException("Only images are allowed"), false);
        }
        callback(null, true);
    },
    limits: {
        files: 1,
        fileSize: 0.5E6 // 0.5 MB
    }
};

const configSingleLarge: MulterOptions = {
    storage: multer.memoryStorage(),
    fileFilter: async (req, file, callback) => {
        const ext = path.extname(file.originalname);
        if(ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
            return callback(new BadRequestException("Only images are allowed"), false);
        }
        callback(null, true);
    },
    limits: {
        files: 1,
        fileSize: 3.5E6 // 3.5 MB
    }
};

@Controller("images")
export class ImageController {

    constructor(
        private readonly imageService: ImageService,

        private readonly forumService: ForumService,

        private readonly permsService: PermissionsService
    ) {}

    @Post("/upload/assets")
    @UseInterceptors(AnyFilesInterceptor(configMultiple))
    async uploadAssets(
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        const images = await this.imageService.uploadImages(files, "assets");
        return { images };
    }

    @Post("/upload/avatars")
    @UseInterceptors(AnyFilesInterceptor(configSingleSmall))
    async uploadAvatar(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        if (files.length !== 1) {
            throw new BadRequestException("Must upload 1 file.");
        }

        const image = await this.imageService.uploadImage(files[0], "avatars", user.id);
        return { image };
    }

    @Post("/upload/forum-icons")
    @UseInterceptors(AnyFilesInterceptor(configSingleSmall))
    async uploadForumIcon(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Query() query: UploadForumImageDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        if (files.length !== 1) {
            throw new BadRequestException("Must upload 1 file.");
        }

        const forum = await this.forumService.findById(query.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.hasModPerms(forum, user);
        if (!hasPerms) {
            throw new ModPermissionsException();
        }

        const image = await this.imageService.uploadImage(files[0], "forum_icons", forum.id);
        return { image };
    }

    @Post("/upload/forum-bgs")
    @UseInterceptors(AnyFilesInterceptor(configSingleLarge))
    async uploadForumBg(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Query() query: UploadForumImageDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        if (files.length !== 1) {
            throw new BadRequestException("Must upload 1 file.");
        }

        const forum = await this.forumService.findById(query.forum);
        if (!forum) {
            throw new ForumNotFoundException();
        }

        const hasPerms = await this.permsService.hasModPerms(forum, user);
        if (!hasPerms) {
            throw new ModPermissionsException();
        }

        const image = await this.imageService.uploadImage(files[0], "forum_bgs", forum.id);
        return { image };
    }
}
