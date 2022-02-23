import DOMPurify from "isomorphic-dompurify";

export const options: DOMPurify.Config = {
    ALLOWED_TAGS: ["p", "ol", "ul", "li", "u", "strong", "em", "s", "a", "h1", "h2", "h3", "sup", "sub", "blockquote"],
    ALLOWED_ATTR: ["href"]
};

export const sanitizeHTML = (dirty: string) => ({
    __html: sanitizeString(dirty) as string
})

export function sanitizeString(dirty: string) {
    return DOMPurify.sanitize(
        dirty, 
        { ...options }
    );
}

export function removeAllHTMLFromString(text: string) {
    return text.replace(/(<([^>]+)>)/g, " ");
}