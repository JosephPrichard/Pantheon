/*
 * Copyright (c) Joseph Prichard 2022.
 */

export interface PageProps<T> {
    componentProps?: T;
    errorCode?: number;
    message?: number;
}