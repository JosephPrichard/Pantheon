export function calcCommentHotRank(votes: number, createdAt: Date) {
    return votes + createdAt.getTime() / 1000 / 45000 / 10;
}