import { Entity, Index, ManyToOne, PrimaryKeyType } from "mikro-orm";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class BanEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    bannedUser!: UserEntity;

    @ManyToOne({ entity: () => ForumEntity, primary: true })
    @Index()
    forum!: ForumEntity;

    @ManyToOne({ entity: () => UserEntity })
    banningUser!: UserEntity;

    [PrimaryKeyType]: [string, string];
}