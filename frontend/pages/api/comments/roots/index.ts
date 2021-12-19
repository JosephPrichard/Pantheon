import { body, query, ValidationChain } from "express-validator";
import { CreateRootBody } from "../../../../api/interfaces/comment";
import { MAX_COMMENT_LEN, SortType } from "../../../../model/global";
import { NextApiRequest, NextApiResponse } from "../../../../utils/types/next";
import { cookie } from "../../../../utils/server/middleware/cookie";
import { getUser } from "../../../../utils/server/session";
import { validate, validateBody } from "../../../../utils/server/validation";
import CommentService from "../../../../model/services/comment.service";

const findFilter: ValidationChain[] = [
    query("post").isString(),
    query("sort")
        .isString()
        .isIn(["new", "top"]),
    query("skip").isInt(),
    query("limit").isInt({ max: 100 })
];

const create: ValidationChain[] = [
    body("post").isString(),
    body("content").isString().isLength({ max: MAX_COMMENT_LEN }).escape()
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET": {
            const err = await validate(req, findFilter);
            if (err) {
                res.status(400).json(err);
                return;
            }

            const filter = {
                post: req.query.post as string,
                sort: req.query.sort as SortType,
                skip: Number(req.query.skip),
                limit: Number(req.query.limit)
            };

            const comments = await CommentService.findTreesByFilter(filter);
            res.json(comments);
            return;
        }
        case "POST": {
            const { body, errors } = await validateBody<CreateRootBody>(req, create);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const id = await CommentService.createRoot(body, user);
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
