import { body, ValidationChain } from "express-validator";
import { UpdateBody } from "../../../api/interfaces/comment";
import { MAX_COMMENT_LEN } from "../../../model/global";
import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { cookie } from "../../../utils/server/middleware/cookie";
import { getUser } from "../../../utils/server/session";
import { validateBody } from "../../../utils/server/validation";
import CommentService from "../../../model/services/comment.service";

const update: ValidationChain[] = [
    body("update.content")
        .isString()
        .isLength({ max: MAX_COMMENT_LEN })
        .escape()
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    switch (req.method) {
        case "GET": {
            const comment = await CommentService.findById(id);
            res.json(comment);
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
            
            const comment = await CommentService.update({ id: id, commenter: user }, body.update);
            res.json(comment);
            return;
        }
        case "DELETE": {
            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const comment = CommentService.delete({ id: id, commenter: user });
            res.json(comment);
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
