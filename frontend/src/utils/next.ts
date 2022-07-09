/*
 * Copyright (c) Joseph Prichard 2022.
 */

export interface Next<T> {
    componentProps?: T;
    errorCode?: number;
    message?: number;
}