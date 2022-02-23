import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import multer from "multer";
import path from "path";
import { getBucket } from "../../resource/bucket.resource";
import { uuid } from "../../utils/id.util";

export interface FileMetaData { 
    id: string;
    path: string;
    contentType: string; 
    size: number;
}

@Injectable()
export class FileService {

    static MULTER_CONFIG: MulterOptions = {
        storage: multer.memoryStorage(),
        fileFilter: async (req, file, callback) => {
            const ext = path.extname(file.originalname);
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
                return callback(new BadRequestException("Only .png and .jpg formats are allowed."), false);
            }
            callback(null, true);
        },
        limits: {
            files: 10,
            fileSize: 3.5E6 // 3.5 mb
        }
    };

    private readonly logger = new Logger(FileService.name);

    private bucket = getBucket();

    async uploadFiles(files: Array<Express.Multer.File>) {
        const promises = [];

        for(const file of files) {
            const id = uuid();
            promises.push(this.uploadFile(file, id));
        }

        return await Promise.all(promises);
    }

    async uploadFile(file: Express.Multer.File, id: string) {
        const path = "assets/" + id;

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