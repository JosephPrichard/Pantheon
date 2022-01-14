import { Entity, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { uuid } from "src/utils/id";
import { PostEntity } from "../post/post.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "notifications" })
export class NotificationEntity {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @ManyToOne({ entity: () => UserEntity })
    receiver!: UserEntity;

    @ManyToOne({ entity: () => PostEntity, nullable: true })
    comment: PostEntity | null = null;

    @Property({ type: Date })
    createdAt: Date = new Date();

    @Property({ type: Boolean })
    read: boolean = false;
}
