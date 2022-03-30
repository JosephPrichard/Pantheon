/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Storage } from "@google-cloud/storage";

require("dotenv").config();

export function getBucket() {
    return new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        }
    }).bucket(process.env.BUCKET_NAME!);
}