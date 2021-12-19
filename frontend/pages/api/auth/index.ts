import { body, ValidationChain } from "express-validator";
import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { SignInBody, SignInRes } from "../../../api/interfaces/auth";
import { ErrorRes } from "../../../api/interfaces/common";
import { validateBody } from "../../../utils/server/validation";
import { cookie } from "../../../utils/server/middleware/cookie";
import UserService from "../../../model/services/user.service";
import SessionService from "../../../model/services/session.service";

const signIn: ValidationChain[] = [
    body("email")
        .isString()
        .normalizeEmail(), 
    body("password").isString()
];

async function handler(req: NextApiRequest, res: NextApiResponse<SignInRes | ErrorRes>) {
    const cookie = req.sessionCookie;
    if (!cookie) {
        res.status(500).end();
        return;
    }

    switch (req.method) {
        case "POST": {
            const { body, errors } = await validateBody<SignInBody>(req, signIn);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const user = await UserService.findByLogin(body.email, body.password);
            if (user) {
                await SessionService.updateUser(cookie, user);
                res.json({ userId: user.id, name: user.name });
            } else {
                res.status(404).json({ msg: "Incorrect login information." });
            }
            return;
        }
        case "DELETE": {
            await SessionService.deleteUser(cookie);
            res.status(200).end();
            return;
        }
        default: {
            res.status(405).end();
            return;
        }
    }
}

export const config = {
    api: {
        externalResolver: true
    }
};

export default cookie(handler);
