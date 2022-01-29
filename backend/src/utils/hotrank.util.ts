export function calcHotRank(votes: number, createdAt: Date) {
    return Math.log10(votes > 0 ? votes : 1) + createdAt.getTime() / 1000 / 45000;
}