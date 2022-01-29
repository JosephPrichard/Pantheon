export const PER_PAGE = 25;

export function countPages(count: number) {
    return Math.ceil(count / PER_PAGE);
}

export function pageOffset(page: number) {
    return (page - 1) * PER_PAGE;
}