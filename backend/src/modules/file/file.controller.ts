import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller("files")
export class FileController {

    constructor(
        private readonly fileService: FileService
    ) {}

    @Post("/upload")
    @UseInterceptors(AnyFilesInterceptor(FileService.MULTER_CONFIG))
    async uploadAssets(
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        const metaData = await this.fileService.uploadImages(files);

        const ids: string[] = [];
        for (const m of metaData) {
            ids.push(m.id);
        }

        return { ids, metaData };
    }
}