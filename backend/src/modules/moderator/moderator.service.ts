import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { CircleEntity } from "../circle/circle.entity";
import { CircleService } from "../circle/circle.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateModeratorDto, DeleteModeratorDto } from "./moderator.dto";
import { ModeratorEntity } from "./moderator.entity";

@Injectable()
export class ModeratorService {
    constructor(
        @InjectRepository(ModeratorEntity) 
        private readonly modRepository: EntityRepository<ModeratorEntity>,

        private readonly userService: UserService,

        private readonly circleService: CircleService
    ) {}

    async create(moderator: CreateModeratorDto, modifier: User) {
        const modEntity = await this.modRepository.findOne({ circle: moderator.circle, user: moderator.user });
        const circle = await this.circleService.findById(moderator.circle);

        if (!modEntity && circle) {
            if (this.circleService.isOwner(circle, modifier)) {
                const modEntity = new ModeratorEntity();

                modEntity.circle = circle;
                modEntity.user = this.userService.getEntityReference(moderator.user);

                this.modRepository.persistAndFlush(modEntity);
                return modEntity;
            }
        }
    }

    async isModerator(circle: CircleEntity, user: User) {
        return await this.modRepository.findOne({ circle: circle, user: user.id }) !== undefined;
    }

    async findByCircle(circle: string) {
        return await this.modRepository.find({ circle: circle });
    }

    async findByUser(user: User) {
        return await this.modRepository.find({ user: user.id });
    }

    async delete(del: DeleteModeratorDto, modifier: User) {
        const modEntity = await this.modRepository.findOne({ circle: del.circle, user: del.user });

        if (modEntity) {
            if (this.circleService.isOwner(modEntity.circle, modifier)) {
                this.modRepository.removeAndFlush(modEntity);
                return modEntity;
            }
        }
    }
}