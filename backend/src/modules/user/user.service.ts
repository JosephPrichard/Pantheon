import * as bcrypt from "bcrypt";
import { UserEntity, UserCredsEntity } from "./user.entity";
import { CreateUserDto, UpdateUserDto, User } from "./user.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs/mikro-orm.common";
import { EntityRepository, expr } from "mikro-orm";
import { EntityManager } from "@mikro-orm/postgresql";

const SALT_ROUNDS = 12;

@Injectable()
export class UserService {
    constructor(
        private readonly em: EntityManager,

        @InjectRepository(UserEntity) 
        private readonly userRepository: EntityRepository<UserEntity>,

        @InjectRepository(UserCredsEntity) 
        private readonly userCredsRepository: EntityRepository<UserCredsEntity>
    ) {}

    async create(user: CreateUserDto) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const userEntity = new UserEntity();
        userEntity.name = user.name;

        const userCredsEntity = new UserCredsEntity();
        userCredsEntity.email = user.email;
        userCredsEntity.hashedPassword = hashedPassword;
        userCredsEntity.salt = salt;
        userCredsEntity.user = userEntity;

        this.userCredsRepository.persist(userCredsEntity);
        this.userRepository.persist(userEntity);
        await this.em.flush();

        return userEntity.id;
    }

    getEntityReference(id: string) {
        return this.userRepository.getReference(id);
    }

    getObject(id: string): User {
        return { id };
    }

    async findUserById(id: string) {
        return await this.userRepository.findOne({ id: id });
    }

    async findCredsByEmail(email: string) {
        return await this.userCredsRepository.findOne({ email: email });
    }

    async findUserByName(name: string) {
        return await this.userRepository.findOne({ 
            [expr("upper(name)")]: this.em.getKnex().raw("upper(?)", name)
        });
    }

    async findByLogin(email: string, password: string) {
        const creds = await this.findCredsByEmail(email);
        if (creds) {
            const hashedPassword = await bcrypt.hash(password, creds.salt);
            if (hashedPassword === creds.hashedPassword) {
                return await this.findUserById(creds.user.id);
            }
        }      
    }

    async update(user: User, userUpdate: UpdateUserDto) {

        const userEntity = await this.findUserById(user.id);

        if (userEntity && userUpdate.description) {
            userEntity.description = userUpdate.description;
        }
        this.userRepository.flush();
        return user;
    }
}