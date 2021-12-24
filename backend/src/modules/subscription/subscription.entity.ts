import { Entity, ManyToOne, Index, PrimaryKeyType, Property } from "mikro-orm";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class SubscriptionEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    @Index()
    user!: UserEntity;

    @ManyToOne({ entity: () => ForumEntity, primary: true })
    @Index()
    forum!: ForumEntity;

    @Property({ type: Boolean })
    isFavorite: boolean = false;

    [PrimaryKeyType]: [string, string];
}
