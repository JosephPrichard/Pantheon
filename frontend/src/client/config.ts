/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { AxiosRequestConfig } from "axios";

const URL = "http://localhost:5000";

export function filePath(name: string) {
    return `${URL}/api/files/${name}`;
}

export const config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: URL
}

export const configNoCreds: AxiosRequestConfig = {
    withCredentials: false,
    baseURL: URL
}