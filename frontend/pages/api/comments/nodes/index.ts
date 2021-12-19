import { body, ValidationChain } from "express-validator";
import { CreateNodeBody } from "../../../../api/interfaces/comment";
import { MAX_COMMENT_LEN } from "../../../../model/global";
import { NextApiRequest, NextApiResponse } from "../../../../utils/types/next";
import { cookie } from "../../../../utils/server/middleware/cookie";
import { getUser } from "../../../../utils/server/session";
import { validateBody } from "../../../../utils/server/validation";
import CommentService from "../../../../model/services/comment.service";

const create: ValidationChain[] = [
    body("parentComment").isString(),
    body("content")
        .isString()
        .isLength({ max: MAX_COMMENT_LEN })
        .escape()
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST": {
            const { body, errors } = await validateBody<CreateNodeBody>(req, create);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const id = await CommentService.createNode(body, user);
            if (id) {
                res.json({ id: id });
            } else {
                res.status(422).json({ err: "Couldn't reply to that comment" });
            }
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
