import { ValidationChain, validationResult } from "express-validator";
import { NextApiRequest } from "../types/next";

async function validateBody<ValidatedBody>(req: NextApiRequest, validations: ValidationChain[]) {
    await Promise.all(validations.map((validaton) => validaton.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return { body: req.body as ValidatedBody };
    } else {
        return { errors: errors.array() };
    }
}

async function validate(req: NextApiRequest, validations: ValidationChain[]) {
    await Promise.all(validations.map((validaton) => validaton.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors.array();
    }
}

export { validateBody, validate };
