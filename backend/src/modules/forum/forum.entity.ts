import { Entity, PrimaryKey, Property } from "mikro-orm";
import { MAX_FORUM_DESC_LEN, MAX_FORUM_NAME_LEN, MAX_TITLE_LEN } from "../../global";

@Entity({ tableName: "forums" })
export class ForumEntity {
    @PrimaryKey({ type: String, length: MAX_FORUM_NAME_LEN })
    id!: string;

    @Property({ type: Number })
    subscriptions: number = 0;

    @Property({ type: String, length: MAX_TITLE_LEN })
    title: string = "";

    @Property({ type: String, length: MAX_FORUM_DESC_LEN })
    description: string = "";

    @Property({ type: Date })
    createdAt: Date = new Date();
}
