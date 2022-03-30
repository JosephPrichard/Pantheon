/*
 * Copyright (c) Joseph Prichard 2022.
 */

export interface IdRes {
    id: string;
}
export interface ErrorRes {
    statusCode: number;
    message: string;
    error: string;
}