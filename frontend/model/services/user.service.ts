import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { UserInput, UserUpdate } from "../interfaces/user";
import { getOrm } from "../orm";
import { Credentials } from "../entities/credentials.entity";
import { expr, MikroORM } from "mikro-orm";

const SALT_ROUNDS = 12;

const UserService = {
    async create(user: UserInput) {
        const orm = await getOrm();

        const emailExists = (await UserService.findCredsByEmail(user.email)) !== null;
        const nameExists = (await UserService.findUserByName(user.name)) !== null;

        if (emailExists) {
            return {
                errors: [
                    {
                        param: "email",
                        msg: "Email address is already in use"
                    }
                ]
            }
        }

        if (nameExists) {
            return {
                errors: [
                    {
                        param: "name",
                        msg: "User name is already in use"
                    }
                ]
            }
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const userEntity = new User();
        userEntity.name = user.name;

        const credentialsEntity = new Credentials();
        credentialsEntity.email = user.email;
        credentialsEntity.hashedPassword = hashedPassword;
        credentialsEntity.salt = salt;
        credentialsEntity.user = userEntity;

        orm.em.persist(credentialsEntity);
        orm.em.persist(userEntity);
        await orm.em.flush();

        

        return { id: userEntity.id };
    },

    async matchByPassword(credentials: Credentials | null, password: string) {
        if (credentials?.salt && credentials?.hashedPassword) {
            const hashedPassword = await bcrypt.hash(password, credentials.salt);
            return hashedPassword === credentials.hashedPassword;
        } else {
            return false;
        }
    },

    async findUserById(id: string) {
        const orm = await getOrm();

        return await orm.em.findOne(User, { id: id });
    },

    async findCredsByEmail(email: string) {
        const orm = await getOrm();

        return await orm.em.findOne(Credentials, { email: email });
    },

    async findUserByName(name: string) {
        const orm = await getOrm();

        return await orm.em.findOne(User, { 
            [expr("upper(name)")]: orm.em.getKnex().raw("upper(?)", name)
        });
    },

    async findByLogin(email: string, password: string) {
        const creds = await UserService.findCredsByEmail(email);
        const match = await UserService.matchByPassword(creds, password);
        if (creds && match) {
            return await UserService.findUserById(creds.user.id);
        } else {
            return undefined;
        }
    },

    async update(user: User, userUpdate: UserUpdate) {
        const orm = await getOrm();

        if (userUpdate.description) {
            user.description = userUpdate.description;
        }
        orm.em.flush();
        return user;
    }
};

export default UserService;
