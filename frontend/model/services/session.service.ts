import crypto from "crypto";
import { MikroORM } from "mikro-orm";
import { getOrm } from "../orm";
import { Session } from "../entities/session.entity";
import { User } from "../entities/user.entity";

const SessionService = {
    async create() {
        const orm = await getOrm();

        const newCookie = crypto.randomBytes(64).toString("hex");

        const session = new Session();
        session.id = newCookie;

        orm.em.persistAndFlush(session);
        return newCookie;
    },

    async findByCookie(cookie: string) {
        const orm = await getOrm();

        return await orm.em.findOne(Session, { id: cookie });
    },

    async updateUser(cookie: string, user: User) {
        const orm = await getOrm();

        const session = await orm.em.findOne(Session, { id: cookie });
        if (session) {
            session.user = user;
            await orm.em.flush();
            return session;
        } else {
            const session = new Session();

            session.id = cookie;
            session.user = user;

            orm.em.persistAndFlush(session);
        }
    },

    async deleteUser(cookie: string) {
        const orm = await getOrm();

        const session = await orm.em.findOne(Session, { id: cookie });
        if (session) {
            session.user = null;
        }
        await orm.em.flush();
        return session;
    }
};

export default SessionService;
