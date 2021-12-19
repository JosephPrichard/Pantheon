export type ErrorRes = { msg?: string } & ValidationErrorRes;

interface ValidationError {
    msg: string;
    param: string;
}

export interface ValidationErrorRes {
    errors?: ValidationError[];
}

export function findValidationMessage(res: ValidationErrorRes, param: string) {
    if (res.errors) {
        for (const error of res.errors) {
            if (error.param === param) {
                return error.msg;
            }
        }
    }
    return "";
}

export interface IdOptionalRes {
    id: string | undefined;
}

export interface IdRes {
    id: string;
}
