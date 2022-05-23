/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../types";

export interface UserEntity {
    id: Id;
    name: string;
    description: string;
    createdAt: string;
    karma: number;
}