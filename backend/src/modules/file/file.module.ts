/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";

@Module({
    controllers: [FileController]
})
export class FileModule {}