import { ValidationError } from "@nestjs/common";

type ErrorArr = { property: string, errors: string[] }[];

export function getErrorArr(errs: ValidationError[]) {
    const response = [];
    for (const err of errs) {
        const errors = [];
        for (const k in err.constraints) {
            errors.push(err.constraints[k]);
        }
        response.push({
            property: err.property,
            errors
        });
    }
    return response as ErrorArr;
}

export function getErrorMsg(errs: ValidationError[]) {
    if (!errs[0]?.constraints) {
        return "";
    }

    for (const key in errs[0].constraints) {
        // returns the value of the very first key.
        return errs[0].constraints[key];
    }
}

