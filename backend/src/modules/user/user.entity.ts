/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Entity, OneToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_USER_DESC_LEN, MAX_USER_NAME_LEN } from "../../global";

@Entity({ tableName: "user_credentials" })
export class UserCredsEntity {
    @PrimaryKey({ type: Number })
    id!: number;

    @Property({ type: String })
    hashedPassword!: string;

    @Property({ type: String })
    salt!: string;
}

@Entity({ tableName: "users" })
export class UserEntity {
    @PrimaryKey({ type: Number })
    id!: number;

    @Property({ type: String, length: MAX_USER_NAME_LEN, unique: true, nullable: true })
    name: string | null = null;

    @Property({ type: String, length: MAX_USER_DESC_LEN })
    description: string = "Hi! I'm new to Pantheon!";

    @Property({ type: Date })
    createdAt: Date = new Date();

    @Property({ type: Number })
    karma: number = 0;

    @OneToOne({ entity: () => UserCredsEntity })
    userCreds!: UserCredsEntity;
}