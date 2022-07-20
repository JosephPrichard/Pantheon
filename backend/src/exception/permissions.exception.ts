/*
 * Copyright (c) Joseph Prichard 2022.
 */

export class PermissionsException extends Error {
    constructor() {
        super("You don't have access to this resource.");
        this.name = PermissionsException.name;
    }
}