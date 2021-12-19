import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { body, ValidationChain } from "express-validator";
import { UpdateBody } from "../../../api/interfaces/post";
import { cookie } from "../../../utils/server/middleware/cookie";
import { validateBody } from "../../../utils/server/validation";
import { getUser } from "../../../utils/server/session";
import PostService from "../../../model/services/post.service";
import { MAX_POST_LEN } from "../../../model/global";
import { sanitizeString } from "../../../utils/sanitize";

const update: ValidationChain[] = [
    body("update.content")
        .optional()
        .isString()
        .trim()
        .customSanitizer(value => sanitizeString(value))
        .isLength({ min: 1})
        .withMessage("Text content cannot be empty")
        .isLength({ max: MAX_POST_LEN })
        .withMessage("Text content cannot exceed " + MAX_POST_LEN + " characters"),
    body("update.images")
        .optional()
        .isArray(),
    body("update.images.*")
        .optional()
        .isString()
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    switch (req.method) {
        case "GET": {
            const post = await PostService.findById(id);
            res.json(post);
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

            const post = await PostService.update({ id: id, poster: user }, body.update);
            res.json(post);
            return;
        }
        case "DELETE": {
            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const post = await PostService.delete({ id: id, poster: user });
            res.json(post);
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
