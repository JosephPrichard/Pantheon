import { Entity, Index, ManyToOne, PrimaryKeyType } from "mikro-orm";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ tableName: "bans" })
export class BanEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    bannedUser!: UserEntity;

    @ManyToOne({ entity: () => ForumEntity, primary: true })
    forum!: ForumEntity;

    @ManyToOne({ entity: () => UserEntity })
    banningUser!: UserEntity;

    [PrimaryKeyType]: [Number, String];
}