/*
 * Copyright (c) Joseph Prichard 2022.
 */

export class InvalidSessionException extends Error {
    constructor() {
        super("Session is invalid or expired.");
        this.name = InvalidSessionException.name;
    }
}
