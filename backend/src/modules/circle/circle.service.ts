import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { ModeratorEntity } from "../moderator/moderator.entity";
import { ModeratorService } from "../moderator/moderator.service";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { CreateCircleDto, IdAndUserQuery, UpdateCircleDto } from "./circle.dto";
import { CircleEntity } from "./circle.entity";

@Injectable()
export class CircleService {

    constructor(
        @InjectRepository(CircleEntity) 
        private readonly circleRepository: EntityRepository<CircleEntity>,

        @InjectRepository(ModeratorEntity) 
        private readonly modRepository: EntityRepository<ModeratorEntity>,

        private readonly userService: UserService
    ) {}

    async create(circle: CreateCircleDto, owner: User) {
        const circleEntity = new CircleEntity();

        circleEntity.id = circle.name;
        circleEntity.owner = this.userService.getEntityReference(owner.id);

        this.circleRepository.persistAndFlush(circleEntity);
        return circleEntity.id;
    }

    isOwner(circle: CircleEntity, user: User) {
        return circle.owner.id === user.id;
    }

    async hasCirclePermissions(circle: CircleEntity, user: User) {
        const isMod = await this.modRepository.findOne({ circle: circle, user: user.id }) !== undefined;;
        return isMod || this.isOwner(circle, user);
    }

    async findById(id: string) {
        return await this.circleRepository.findOne({ id: id });
    }

    async update(query: IdAndUserQuery, update: UpdateCircleDto) {
        const circle = await this.findById(query.id);

        if (circle) {
            if (await this.hasCirclePermissions(circle, query.user)) {
                if (update.description) {
                    circle.description = update.description;
                }
                if (update.title) {
                    circle.title = update.title;
                }
                if (update.image) {
                    circle.image = update.image;
                }

                this.circleRepository.flush();
                return circle;
            }
        }
    }
}