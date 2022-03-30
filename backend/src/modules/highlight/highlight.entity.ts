/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ManyToOne, Index, PrimaryKeyType, Property, Entity } from "mikro-orm";
import { UserEntity } from "../user/user.entity";

// a highlight is the group of selected forums for a user
@Entity({ tableName: "highlights" })
export class HighlightEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    user!: UserEntity;

    @Property({ type: Array })
    forums!: string[]

    @Property({ type: Date })
    updatedAt: Date = new Date();

    [PrimaryKeyType]: [String];
}