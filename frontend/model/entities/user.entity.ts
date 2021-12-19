import { Entity, Index, PrimaryKey, Property } from "mikro-orm";
import { MAX_USER_DESC_LEN, MAX_USER_NAME_LEN } from "../global";
import { uuid } from "../utils/id";

@Entity()
class User {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @Property({ type: String, length: MAX_USER_NAME_LEN, unique: true })
    @Index()
    name!: string;

    @Property({ type: String, length: MAX_USER_DESC_LEN })
    description: string = "Hi! I'm new to Pantheon!";

    @Property({ type: Date })
    createdAt: Date = new Date();
}

export { User };
