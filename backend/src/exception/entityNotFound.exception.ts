export class EntityNotFoundException extends Error {
    constructor(m: string) {
        super(m);
    }
}

export class PostNotFoundException extends EntityNotFoundException {
    constructor() {
        super("Post not found.");
    }
}

export class CommentNotFoundException extends EntityNotFoundException {
    constructor() {
        super("Forum not found.");
    }
}

export class ForumNotFoundException extends EntityNotFoundException {
    constructor() {
        super("Post not found.");
    }
}

export class BanNotFoundException extends EntityNotFoundException {
    constructor() {
        super("The user isn't banned on this forum.");
    }
}

export class FavoriteNotFoundException extends EntityNotFoundException {
    constructor() {
        super("You haven't favorited this post.");
    }
}

export class ModeratorNotFoundException extends EntityNotFoundException {
    constructor() {
        super("This user isn't a moderator on this forum.");
    }
}

export class SubscriptionNotFoundException extends EntityNotFoundException {
    constructor() {
        super("This user isn't subscribed to this forum.");
    }
}
