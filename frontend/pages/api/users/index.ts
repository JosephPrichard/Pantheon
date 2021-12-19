import { CreateBody, UpdateBody } from "../../../api/interfaces/user";
import { ErrorRes, IdOptionalRes } from "../../../api/interfaces/common";
import { MAX_PASSWORD_LEN, MAX_USER_DESC_LEN, MAX_USER_NAME_LEN } from "../../../model/global";
import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { ValidationChain, body } from "express-validator";
import UserService from "../../../model/services/user.service";
import { cookie } from "../../../utils/server/middleware/cookie";
import { getUser } from "../../../utils/server/session";
import { validateBody } from "../../../utils/server/validation";

const create: ValidationChain[] = [
    body("email").isString()
        .isEmail()
        .withMessage("Must be a valid email address.")
        .normalizeEmail()
        .custom(async (value) => await UserService.findCredsByEmail(value))
        .withMessage("Email address is already in use."),
    body("name").isString()
        .isLength({ min: 5, max: MAX_USER_NAME_LEN })
        .withMessage(`Should be between 5 and ${MAX_USER_NAME_LEN} characters.`)
        .escape()
        .custom(async (value) => await UserService.findUserByName(value))
        .withMessage("User name is already in use."),
    body("password").isString()
        .isLength({ min: 5, max: MAX_PASSWORD_LEN })
        .withMessage(`Should be between 5 and ${MAX_PASSWORD_LEN} characters.`),
    body("verifyPassword")
        .isString()
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords don't match.")
];

const update: ValidationChain[] = [
    body("update.description")
        .optional()
        .isString()
        .isLength({ min: 10, max: MAX_USER_DESC_LEN })
];

async function handler(req: NextApiRequest, res: NextApiResponse<IdOptionalRes | ErrorRes>) {
    switch (req.method) {
        case "POST": {
            const { body, errors } = await validateBody<CreateBody>(req, create);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const { id, errors: createErrors } = await UserService.create(body);
            if(id) {
                res.json({ id: id });
            } else {
                res.status(400).json({ errors: createErrors });
            } 
            return;
        }
        case "PUT": {
            const { body, errors } = await validateBody<UpdateBody>(req, update);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const updatedUser = await UserService.update(user, body.update);
            const id = updatedUser?.id;
            res.json({ id: id });
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
