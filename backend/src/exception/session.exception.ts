export class InvalidSessionException extends Error {
    constructor() {
        super("Session is invalid or expired.");
        this.name = InvalidSessionException.name;
    }
}
