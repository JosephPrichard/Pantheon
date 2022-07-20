/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { UserEntity } from "./user.entity";

export interface User {
    id: number;
    name: string;
}

export interface UserIdRo {
    id: number;
}

export interface UserRo {
    user: UserEntity;
}

export interface SignedInUserRo {
    user?: User;
}

export interface SignInRo {
    userId: number;
    name: string | null;
}

export interface SignOutRo {
    message: string;
}