export class InvalidInputException extends Error {
    param?: string;

    constructor(m: string, param?: string) {
        super(m);
        this.param = param;
        this.name = InvalidInputException.name;
    }
}

export class DuplicateResourceException extends InvalidInputException {
    constructor() {
        super("The resource already exists.");
        this.name = DuplicateResourceException.name;
    }
}

export class DuplicateForumException extends InvalidInputException {
    constructor(name: string) {
        super(`A forum with the name "${name}" already exists.`, "name");
        this.name = DuplicateForumException.name;
    }
}