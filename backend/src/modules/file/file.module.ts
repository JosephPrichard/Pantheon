/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
    exports: [FileService],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {}