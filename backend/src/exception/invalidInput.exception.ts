/*
 * Copyright (c) Joseph Prichard 2022.
 */

export class InvalidInputException extends Error {
    constructor(m: string) {
        super(m);
        this.name = InvalidInputException.name;
    }
}

export class DuplicateResourceException extends InvalidInputException {
    constructor() {
        super("The resource already exists.");
        this.name = DuplicateResourceException.name;
    }
}