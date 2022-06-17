/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ValidationError } from "@nestjs/common";

export function getErrorMsg(errs: ValidationError[]) {
    const err = errs[0];

    if (!err?.constraints) {
        return "";
    }

    const keys = Object.keys(err.constraints);

    if (keys.length < 0) {
        return "";
    }

    const key = keys[0];
    return err.constraints[key];
}

