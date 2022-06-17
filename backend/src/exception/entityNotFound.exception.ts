/*
 * Copyright (c) Joseph Prichard 2022.
 */

export class EntityNotFoundException extends Error {
    constructor(m: string) {
        super(m);
        this.name = EntityNotFoundException.name;
    }
}

export class PostNotFoundException extends EntityNotFoundException {
    constructor() {
        super("Post not found.");
        this.name = PostNotFoundException.name;
    }
}

export class CommentNotFoundException extends EntityNotFoundException {
    constructor() {
        super("Comment not found.");
        this.name = CommentNotFoundException.name;
    }
}

export class ForumNotFoundException extends EntityNotFoundException {
    constructor() {
        super("Forum not found.");
        this.name = ForumNotFoundException.name;
    }
}

export class NotificationNotFound extends EntityNotFoundException {
    constructor() {
        super("Notification not found.");
        this.name = NotificationNotFound.name;
    }
}

export class FavoriteNotFoundException extends EntityNotFoundException {
    constructor() {
        super("You haven't favorite this post.");
        this.name = FavoriteNotFoundException.name;
    }
}

export class SubscriptionNotFoundException extends EntityNotFoundException {
    constructor() {
        super("This user isn't subscribed to this forum.");
        this.name = SubscriptionNotFoundException.name;
    }
}
