import { Injectable } from "@nestjs/common";
import { getBucket } from "../../resource/bucket";
import { uuid } from "../../utils/id";

interface File { 
    id: string;
    path: string;
    contentType: any; 
    size: any;
}

@Injectable()
export class ImageService {

    private bucket = getBucket();

    async uploadImages(files: Array<Express.Multer.File>, folder: string) {
        const promises = []

        for(const file of files) {
            const id = uuid();
            promises.push(this.uploadImage(file, folder, id));
        }

        return await Promise.all(promises);
    }

    async uploadImage(file: Express.Multer.File, folder: string, id: string) {
        const path = folder + "/" + id;

        const fileBlob = this.bucket.file(path);
        const uploadStream = fileBlob.createWriteStream();

        return new Promise<File>((resolve, reject) => {
            file.stream.pipe(uploadStream)
                .on("error", () => reject())
                .on("finish", () => {
                    () => {
                        resolve({
                            id,
                            path,
                            contentType: fileBlob.metadata.contentType,
                            size: fileBlob.metadata.size
                        })
                    }
                });
        });
    }

    downloadImage(path: string) {
        const file = this.bucket.file(path);
        const downloadStream = file.createReadStream();

        return {
            downloadStream,
            metadata: file.metadata
        }
    }
}