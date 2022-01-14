import { Entity, ManyToOne, PrimaryKeyType } from "mikro-orm";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "moderators" })
export class ModeratorEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    user!: UserEntity;

    @ManyToOne({ entity: () => ForumEntity, primary: true })
    forum!: ForumEntity;

    [PrimaryKeyType]: [string, string];
}
