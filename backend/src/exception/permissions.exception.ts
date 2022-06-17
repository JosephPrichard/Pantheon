/*
 * Copyright (c) Joseph Prichard 2022.
 */

export class PermissionsException extends Error {
    constructor(m: string) {
        super(m);
        this.name = PermissionsException.name;
    }
}

export class ResourcePermissionsException extends PermissionsException {
    constructor() {
        super("You don't have access to this resource.");
        this.name = ResourcePermissionsException.name;
    }
}

export class KarmaException extends PermissionsException {
    constructor(min: number) {
        super(`You need at least ${min} karma to create a forum.`);
        this.name = KarmaException.name;
    }
}