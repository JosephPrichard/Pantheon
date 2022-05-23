/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ValidationError } from "@nestjs/common";

export function getErrorMsg(errs: ValidationError[]) {
    const err = errs[0];

    if (!err?.constraints || !err.constraints[0]) {
        return "";
    }

    const key = Object.keys(err.constraints[0])[0];
    return err.constraints[key];
}

