import { Entity, ManyToOne, PrimaryKey } from "mikro-orm";
import { User } from "./user.entity";

@Entity()
class Session {
    @PrimaryKey({ type: String })
    id!: string;

    @ManyToOne({ entity: () => User, nullable: true })
    user: User | null = null;
}

export { Session };
