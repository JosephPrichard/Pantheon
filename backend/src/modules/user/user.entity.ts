import { Entity, OneToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_EMAIL_LEN, MAX_USER_DESC_LEN, MAX_USER_NAME_LEN } from "../../global";

@Entity({ tableName: "users" })
export class UserEntity {
    @PrimaryKey({ type: Number })
    id!: number;

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
    @OneToOne({ entity: () => UserEntity })
    user!: UserEntity;

    @Property({ type: String, length: MAX_EMAIL_LEN, unique: true, primary: true })
    email!: string;

    @Property({ type: String })
    hashedPassword!: string;

    @Property({ type: String })
    salt!: string;
}
