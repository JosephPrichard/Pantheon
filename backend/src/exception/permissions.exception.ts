/*
 * Copyright (c) Joseph Prichard 2022.
 */

export class PermissionsException extends Error {
    constructor(m: string) {
        super(m);
        this.name = PermissionsException.name;
    }
}

export class BannedException extends PermissionsException {
    constructor() {
        super("You are banned on this forum.");
        this.name = BannedException.name;
    }
}

export class ModPermissionsException extends PermissionsException {
    constructor() {
        super("You don't have forum moderator permissions.");
        this.name =  ModPermissionsException.name;
    }
}

export class OwnerPermissionsException extends PermissionsException {
    constructor() {
        super("You don't have forum owner permissions.");
        this.name = OwnerPermissionsException.name;
    }
}

export class ResourcePermissionsException extends PermissionsException {
    constructor() {
        super("You don't have access to this resource.");
        this.name = ResourcePermissionsException.name;
    }
}