import { Entity, Index, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_FORUM_DESC_LEN, MAX_FORUM_NAME_LEN, MAX_TITLE_LEN } from "../../utils/global";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "forums" })
export class ForumEntity {
    @PrimaryKey({ type: String, length: MAX_FORUM_NAME_LEN })
    id!: string;

    @ManyToOne({ entity: () => UserEntity })
    owner!: UserEntity;

    @Property({ type: Number })
    subscriptions: number = 0;

    @Property({ type: String, length: MAX_TITLE_LEN })
    title: string = "";

    @Property({ type: String, length: MAX_FORUM_DESC_LEN })
    description: string = "";
}
