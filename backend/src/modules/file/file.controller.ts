/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { BadRequestException, Controller, Get, NotFoundException, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import multer from "multer";
import * as fs from "fs";
import path from "path";
import { uuid } from "../../utils/uuid.utils";

@Controller("files")
export class FileController {

    @Post("/upload")
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: multer.diskStorage({
                destination: "/tmp/images",
                filename: (req, file, cb) => {
                    cb(null, uuid());
                }
            }),
            fileFilter: async (req, file, cb) => {
                const ext = path.extname(file.originalname);
                if(ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
                    return cb(new BadRequestException("Only .png and .jpg formats are allowed."), false);
                }
                cb(null, true);
            },
            limits: {
                files: 10,
                fileSize: 3.5E6 // 3.5 mb
            }
        }
    ))
    async uploadImages(@UploadedFiles() files?: Array<Express.Multer.File>) {
        if (!files || files.length < 1) {
            throw new BadRequestException("Need to upload at least 1 file.");
        }

        const ids: string[] = [];
        for (const f of files) {
            ids.push(f.filename);
        }

        return { ids };
    }

    @Get("/:id")
    @UseInterceptors()
    async downloadImage(
        @Res() res: Response,
        @Param("id") idParam: string
    ) {
        fs.readFile(`/tmp/images/${idParam}`, (err, data) => {
            if (data === null) {
                throw new NotFoundException("Couldn't find that file.");
            }
            res.writeHead(200, {"Content-Type": "image/jpeg" });
            res.end(data);
        });
    }
}