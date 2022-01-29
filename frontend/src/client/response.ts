export interface IdRes {
    id: string;
}

export interface MessageElement {
    property: string;
    errors: string[];
}

export interface PropertyErrorRes {
    statusCode: number;
    message: MessageElement[];
    error: string;
}

export interface ErrorRes {
    statusCode: number;
    message: string;
    error: string;
}

export function findErrors(res: PropertyErrorRes, prop: string) {
    for (const messageElement of res.message) {
        if (messageElement.property === prop) {
            return messageElement.errors;
        }
    }
    return [];
}

export function findError(res: PropertyErrorRes, param: string) {
    return findErrors(res, param)[0];
}

