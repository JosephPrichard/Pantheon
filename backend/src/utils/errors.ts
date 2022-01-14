import { ValidationError } from "@nestjs/common";

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
    return response;
}
