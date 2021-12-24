export class PermissionsException extends Error {
    constructor(m: string) {
        super(m);
    }
}

export class BannedException extends PermissionsException {
    constructor() {
        super("You are banned on this forum.");
    }
}

export class ModPermissionsException extends PermissionsException {
    constructor() {
        super("You don't have forum moderator permissions.");
    }
}

export class OwnerPermissionsException extends PermissionsException {
    constructor() {
        super("You don't have forum owner permissions.");
    }
}

export class ResourcePermissionsException extends PermissionsException {
    constructor() {
        super("You don't have access to this resource.");
    }
}