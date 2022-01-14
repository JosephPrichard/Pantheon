import { Injectable, Logger } from "@nestjs/common";
import { getBucket } from "../../resource/bucket";
import { uuid } from "../../utils/id";

export interface FileMetaData { 
    id: string;
    path: string;
    contentType: string; 
    size: number;
}

@Injectable()
export class ImageService {

    private readonly logger = new Logger(ImageService.name);

    private bucket = getBucket();

    async uploadImages(files: Array<Express.Multer.File>, folder: string) {
        const promises = [];

        for(const file of files) {
            const id = uuid();
            promises.push(this.uploadImage(file, folder, id));
        }

        return await Promise.all(promises);
    }

    async uploadImage(file: Express.Multer.File, folder: string, id: string) {
        const path = folder + "/" + id;

        const fileBlob = this.bucket.file(path);

        return new Promise<FileMetaData>((resolve, reject) => {
            fileBlob.save(file.buffer, { contentType: file.mimetype }, err => reject(err));

            const fileMetaData = {
                id,
                path,
                contentType: file.mimetype,
                size: file.size
            }

            this.logger.log(`Uploaded a file to GCP bucket ${JSON.stringify(fileMetaData)}`);

            resolve(fileMetaData);
        });
    }
}