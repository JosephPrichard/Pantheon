import { Entity, Index, OneToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_EMAIL_LEN } from "../global";
import { uuid } from "../utils/id";
import { User } from "./user.entity";

@Entity()
class Credentials {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @OneToOne({ entity: () => User })
    @Index()
    user!: User;

    @Property({ type: String, length: MAX_EMAIL_LEN, unique: true })
    @Index()
    email!: string;

    @Property({ type: String })
    hashedPassword!: string;

    @Property({ type: String })
    salt!: string;
}

export { Credentials };
