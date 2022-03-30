/*
 * Copyright (c) Joseph Prichard 2022.
 */

import DOMPurify from "isomorphic-dompurify";

export const options: DOMPurify.Config = {
    ALLOWED_TAGS: ["p", "ol", "ul", "li", "u", "strong", "em", "s", "a", "sup", "sub", "blockquote"],
    ALLOWED_ATTR: ["href"]
};

export function sanitizeString(dirty: string) {
    return DOMPurify.sanitize(
        dirty, 
        { ...options }
    ) as string;
}