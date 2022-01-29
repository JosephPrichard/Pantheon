import DOMPurify from "isomorphic-dompurify";

export const options: DOMPurify.Config = {
    ALLOWED_TAGS: ["p", "ul", "li", "u", "strong", "em", "s", "a", "h1", "h2", "h3", "sup", "sub", "blockquote"],
    ALLOWED_ATTR: ["href"]
};

export function sanitizeString(dirty: string) {
    return DOMPurify.sanitize(
        dirty, 
        { ...options }
    ) as string;
}