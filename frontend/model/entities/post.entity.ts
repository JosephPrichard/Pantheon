import { ArrayType, Entity, Index, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { User } from "./user.entity";
import { MAX_LINK_LEN, MAX_POST_LEN, MAX_TITLE_LEN } from "../global";
import { uuid } from "../utils/id";

@Entity()
@Index({ properties: ["poster"] })
class Post {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @ManyToOne({ entity: () => User, nullable: true })
    poster: User | null = null;

    @Property({ type: String, length: MAX_TITLE_LEN })
    title!: string;

    @Property({ type: Number })
    votes: number = 0;

    @Property({ type: Number })
    comments: number = 0;

    @Property({ type: String, length: MAX_POST_LEN, nullable: true })
    content: string | null = null;

    @Property({ type: ArrayType })
    images: string[] = [];

    @Property({ type: String, length: MAX_LINK_LEN, nullable: true })
    link: string | null = null;

    @Property({ type: Date })
    createdAt: Date = new Date();
}

export { Post };
