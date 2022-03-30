/*
 * Copyright (c) Joseph Prichard 2022.
 */

import request from "axios";

export function isValidError(err: any) {
    return request.isAxiosError(err) && err.response
}