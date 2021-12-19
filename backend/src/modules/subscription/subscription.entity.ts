import { Entity, ManyToOne, Index, PrimaryKeyType, Property } from "mikro-orm";
import { CircleEntity } from "../circle/circle.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class SubscriptionEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    @Index()
    user!: UserEntity;

    @ManyToOne({ entity: () => CircleEntity, primary: true })
    @Index()
    circle!: CircleEntity;

    @Property({ type: Boolean })
    isFavorite: boolean = false;

    [PrimaryKeyType]: [string, string];
}
