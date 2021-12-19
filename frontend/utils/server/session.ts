import SessionService from "../../model/services/session.service";
import { NextApiRequest } from "../types/next";

async function getUser(req: NextApiRequest) {
    const cookie = req.sessionCookie;
    if (cookie) {
        const session = await SessionService.findByCookie(cookie);
        if (session?.user) {
            return { user: session.user };
        } else {
            return { err: "Session is invalid or expired." };
        }
    } else {
        return { err: "Cookie is missing or malformed." };
    }
}

export { getUser };
