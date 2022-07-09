/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs/mikro-orm.common";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EntityRepository, expr } from "mikro-orm";
import { AppLogger } from "src/loggers/applogger";
import { CreateUserDto, ResetPasswordDto, UpdateUserDto, User } from "./user.dto";
import { UserCredsEntity, UserEntity } from "./user.entity";
import { EntityNotFoundException } from "../../exception/entityNotFound.exception";

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

        const userCredsEntity = new UserCredsEntity();
        userCredsEntity.hashedPassword = hashedPassword;
        userCredsEntity.salt = salt;

        const userEntity = new UserEntity();
        userEntity.name = user.name;
        userEntity.userCreds = userCredsEntity;

        this.userCredsRepository.persist(userCredsEntity);
        this.userRepository.persist(userEntity);
        await this.em.flush();
        
        this.logger.log(`Created a new user ${userEntity.id} with name ${user.name}`);
        return userEntity.id;
    }

    getEntityReference(id: number) {
        return this.userRepository.getReference(id);
    }

    async findUserById(id: number) {
        return await this.userRepository.findOne({ id: id });
    }

    async findUserByName(name: string) {
        return await this.userRepository.findOne(
            { [expr("upper(name)")]: this.em.getKnex().raw("upper(?)", name) },
            ["userCreds"]
        );
    }

    async findByLogin(name: string, password: string) {
        const userEntity = await this.findUserByName(name);
        if (userEntity) {
            const hashedPassword = await bcrypt.hash(password, userEntity.userCreds.salt);
            if (hashedPassword === userEntity.userCreds.hashedPassword) {
                return userEntity;
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

    async updatePassword(resetPassword: ResetPasswordDto, user: User) {
        const userEntity = await this.findByLogin(user.name, resetPassword.password);

        if (!userEntity) {
            throw new EntityNotFoundException("Incorrect login information.");
        }

        userEntity.userCreds.hashedPassword = await bcrypt.hash(resetPassword.newPassword, userEntity.userCreds.salt);

        await this.userRepository.flush();

        this.logger.log(`User ${user.id} updated their password`, userEntity);
        return userEntity?.id;
    }

    async delete(user: User) {
        this.logger.log(`User ${user.id} was deleted`);
        return await this.userRepository.nativeUpdate(
            { id: user.id },
            { name: null, description: "" }
        );
    }
}