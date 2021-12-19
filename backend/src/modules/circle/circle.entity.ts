import { Entity, Index, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_CIRCLE_DESC_LEN, MAX_CIRCLE_NAME_LEN, MAX_TITLE_LEN } from "../../utils/global";
import { uuid } from "../../utils/id";
import { UserEntity } from "../user/user.entity";

@Entity()
export class CircleEntity {
    @PrimaryKey({ type: String, length: MAX_CIRCLE_NAME_LEN })
    id!: string;

    @ManyToOne({ entity: () => UserEntity })
    @Index()
    owner!: UserEntity;

    @Property({ type: Number })
    subscriptions: number = 0;

    @Property({ type: String, length: MAX_TITLE_LEN })
    title: string = "";

    @Property({ type: String, length: MAX_CIRCLE_DESC_LEN })
    description: string = "";

    @Property({ type: String, nullable: true })
    image: string | null = null;
}
