import { Entity, ManyToOne, Index, PrimaryKeyType } from "mikro-orm";
import { CircleEntity } from "../circle/circle.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class ModeratorEntity {
    @ManyToOne({ entity: () => UserEntity, primary: true })
    @Index()
    user!: UserEntity;

    @ManyToOne({ entity: () => CircleEntity, primary: true })
    @Index()
    circle!: CircleEntity;

    [PrimaryKeyType]: [string, string];
}
