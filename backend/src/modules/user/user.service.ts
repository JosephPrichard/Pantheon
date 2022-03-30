/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs/mikro-orm.common";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EntityRepository, expr } from "mikro-orm";
import { AppLogger } from "src/loggers/applogger";
import { CreateUserDto, UpdateUserDto, User } from "./user.dto";
import { UserCredsEntity, UserEntity } from "./user.entity";

const SALT_ROUNDS = 12;

@Injectable()
export class UserService {

    private readonly logger = new AppLogger(UserService.name);

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
        
        this.logger.log(`Created a new user ${userEntity.id} with name ${user.name} and email ${user.email}`);
        return userEntity.id;
    }

    getEntityReference(id: number) {
        return this.userRepository.getReference(id);
    }

    async findUserById(id: number) {
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

    async update(userUpdate: UpdateUserDto, user: User) {
        const userEntity = await this.findUserById(user.id);

        if (userEntity && userUpdate.description) {
            userEntity.description = userUpdate.description;
        }
        
        await this.userRepository.flush();

        this.logger.log(`User ${user.id} updated their profile`, userEntity);
        return user;
    }
}