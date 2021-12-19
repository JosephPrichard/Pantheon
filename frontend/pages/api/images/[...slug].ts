import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { cookie } from "../../../utils/server/middleware/cookie";
import bucket from "../../../model/bucket";
import multiparty from "multiparty";
import { uuid } from "../../../model/utils/id";

const PATHS = ["assets/", "avatars/"];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const slug = req.query.slug as string[];

    switch(req.method) {
        case "GET": {
            let path = "";
            for(let i = 0; i < slug.length-1; i++) {
                path += slug[i] + "/";
            }
            if(slug.length >= 1) {
                path += slug[slug.length - 1];
            }

            const file = bucket.file(path);
            const downloadStream = file.createReadStream();
    
            res.setHeader("Content-Type", "image/jpeg");
    
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
            return;
        }
        case "POST": {
            let path = "";
            for(const s of slug) {
                path += s + "/";
            }

            if (!PATHS.includes(path)) {
                res.json({ err: "Invalid path" });
                return;
            }

            const ids: string[] = [];

            const form = new multiparty.Form();
    
            form.on("part", (part) => {
                if (part.filename) {
                    const id = uuid();

                    if (ids.length > 10) {
                        form.removeAllListeners();
                    } else {
                        const file = bucket.file(path + id);
                        const uploadStream = file.createWriteStream();
                                        
                        ids.push(id);
        
                        part.on("data", (chunk) => {
                            uploadStream.write(chunk);
                        });
        
                        part.on("end", (chunk: any) => {
                            uploadStream.end(chunk);
                        });

                        part.on("error", () => {
                            uploadStream.destroy();
                            part.destroy();
                            form.removeAllListeners();
                            res.status(500).json({ msg: "An error occured while trying to upload files" });
                        });
                    }  
                }
            });
    
            form.on("close", () => {
                if (ids.length === 0) {
                    res.status(400).json({ msg: "Must submit at least one file" });
                } else {
                    console.log(ids);
                    res.json({ ids: ids });
                }
            });

            form.parse(req);
            return;
        }
        default: {
            res.status(405).end();
            return;
        }
    }
}

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false // ESSENTIAL FOR FILE UPLOAD TO WORK
    }
};

export default cookie(handler);
