/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { AxiosRequestConfig } from "axios";

export const config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: "http://localhost:5000"
}

export const configNoCreds: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: "http://localhost:5000"
}