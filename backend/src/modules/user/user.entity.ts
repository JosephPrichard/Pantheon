import { Entity, Index, OneToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_EMAIL_LEN, MAX_USER_DESC_LEN, MAX_USER_NAME_LEN } from "../../utils/global";
import { uuid } from "../../utils/id";

@Entity({ tableName: "users" })
export class UserEntity {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @Property({ type: String, length: MAX_USER_NAME_LEN, unique: true })
    name!: string;

    @Property({ type: String, length: MAX_USER_DESC_LEN })
    description: string = "Hi! I'm new to Pantheon!";

    @Property({ type: Date })
    createdAt: Date = new Date();

    @Property({ type: Number })
    karma: number = 0;
}

@Entity({ tableName: "user_credentials" })
export class UserCredsEntity {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @OneToOne({ entity: () => UserEntity })
    user!: UserEntity;

    @Property({ type: String, length: MAX_EMAIL_LEN, unique: true })
    email!: string;

    @Property({ type: String })
    hashedPassword!: string;

    @Property({ type: String })
    salt!: string;
}
