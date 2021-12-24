import { ArrayType, Entity, Index, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { UserEntity } from "../user/user.entity";
import { MAX_LINK_LEN, MAX_POST_LEN, MAX_TITLE_LEN } from "../../utils/global";
import { uuid } from "../../utils/id";
import { ForumEntity } from "../forum/forum.entity";

@Entity()
export class PostEntity {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @ManyToOne({ entity: () => UserEntity, nullable: true })
    @Index()
    poster: UserEntity | null = null;

    @ManyToOne({ entity: () => ForumEntity, nullable: true })
    @Index()
    forum!: ForumEntity;

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
    @Index()
    createdAt: Date = new Date();
}