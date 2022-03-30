/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ModeratorEntity } from "../../client/models/moderator";

export interface ModsRes {
    moderators: ModeratorEntity[];
}