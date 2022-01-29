import { Entity, ManyToOne, PrimaryKeyType, Property } from "mikro-orm";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "moderators" })
export class ModeratorEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    user!: UserEntity;

    @ManyToOne({ entity: () => ForumEntity, primary: true })
    forum!: ForumEntity;

    @Property({ type: Date })
    createdAt: Date = new Date();

    [PrimaryKeyType]: [Number, String];
}
