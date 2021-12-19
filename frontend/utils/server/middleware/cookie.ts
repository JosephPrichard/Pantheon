import { CookieSerializeOptions, serialize } from "cookie";
import { SESSION_EXPIRY } from "../../../model/global";
import SessionService from "../../../model/services/session.service";
import { Handler, NextApiRequest, NextApiResponse } from "../../types/next";

export const COOKIE_NAME = "SESSION";

function setResponseCookie(res: NextApiResponse, value: string) {
    const maxAge = SESSION_EXPIRY;
    const options: CookieSerializeOptions = { 
        maxAge,
        expires: new Date(Date.now() + maxAge * 1000),
        httpOnly: true,
        path: "/"
    };
    res.setHeader("Set-Cookie", serialize(COOKIE_NAME, value, options));
}

const cookie = (next: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const cookie = req.cookies[COOKIE_NAME];
    if (!cookie) {
        const cookie = await SessionService.create();
        if (cookie) {
            req.sessionCookie = cookie;
            setResponseCookie(res, cookie);
        }
    } else {
        req.sessionCookie = cookie;
    }
    next(req, res);
};

export { cookie };