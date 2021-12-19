import { body, ValidationChain } from "express-validator";
import { CreateFavoriteBody } from "../../../api/interfaces/favorite";
import FavoriteService from "../../../model/services/favorite.service";
import { getUser } from "../../../utils/server/session";
import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { validateBody } from "../../../utils/server/validation";

const create: ValidationChain[] = [
    body("post").isString()
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { user, err } = await getUser(req);
    if (!user) {
        res.status(401).json({ msg: err });
        return;
    }

    switch (req.method) {
        case "POST": {
            const { body, errors } = await validateBody<CreateFavoriteBody>(req, create);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const id = FavoriteService.create(body.post, user);
            res.json({ id: id });
            return;
        }
        case "GET": {
            const favorites = FavoriteService.findByUser(user);
            res.json({ favorites: favorites });
            return;
        }
        default: {
            res.status(405).end();
            return;
        }
    }
}

export default handler;