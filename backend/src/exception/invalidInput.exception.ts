import { InvalidSessionException } from "./session.exception";

export class InvalidInputException extends Error {
    constructor(m: string) {
        super(m);
    }
}

export class DuplicateResourceException extends InvalidInputException {
    constructor() {
        super("The resource already exists.");
    }
}

export class DuplicateForumException extends InvalidInputException {
    constructor(name: string) {
        super(`A forum with the name "${name}" already exists.`);
    }
}