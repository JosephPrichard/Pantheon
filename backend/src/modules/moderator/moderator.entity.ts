import { Entity, ManyToOne, Index, PrimaryKeyType } from "mikro-orm";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class ModeratorEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    @Index()
    user!: UserEntity;

    @ManyToOne({ entity: () => ForumEntity, primary: true })
    @Index()
    forum!: ForumEntity;

    [PrimaryKeyType]: [string, string];
}
