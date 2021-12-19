import { User } from "../entities/user.entity";

export interface VoteInput {
    resourceId: string;
    voter: User;
    value: -1 | 0 | 1;
}