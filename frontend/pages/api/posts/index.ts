import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import PostService from "../../../model/services/post.service";
import { body, ValidationChain } from "express-validator";
import { MAX_POST_LEN, MAX_TITLE_LEN } from "../../../model/global";
import { CreateBody } from "../../../api/interfaces/post";
import { cookie } from "../../../utils/server/middleware/cookie";
import { validateBody } from "../../../utils/server/validation";
import { getUser } from "../../../utils/server/session";
import { ErrorRes, IdRes } from "../../../api/interfaces/common";
import { sanitizeString } from "../../../utils/sanitize";

const create: ValidationChain[] = [
    body("title")
        .isString()
        .trim()
        .escape()
        .isLength({ min: 5, max: MAX_TITLE_LEN })
        .withMessage(`Title should be between 5 and ${MAX_TITLE_LEN} characters`),
    body("content")
        .optional()
        .isString()
        .trim()
        .customSanitizer(value => sanitizeString(value))
        .isLength({ min: 1})
        .withMessage("Text content cannot be empty")
        .isLength({ max: MAX_POST_LEN })
        .withMessage(`Text content cannot exceed ${MAX_POST_LEN} characters`),
    body("link")
        .optional()
        .isString()
        .trim()
        .customSanitizer(value => sanitizeString(value))
        .isURL()
        .withMessage("Link must be a valid URL.")
        .isLength({ max: MAX_POST_LEN })
        .withMessage(`Link cannot exceed ${MAX_POST_LEN} characters`),
    body("images")
        .optional()
        .isArray(),
    body("images.*")
        .optional()
        .isString(),
];

async function handler(req: NextApiRequest, res: NextApiResponse<IdRes | ErrorRes>) {
    switch (req.method) {
        case "POST": {
            const { body, errors } = await validateBody<CreateBody>(req, create);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const id = await PostService.create(body, user);
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
