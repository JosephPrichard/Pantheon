import { NextApiRequest as Req, NextApiResponse as Res } from "next";

export interface NextApiRequest<T = never> extends Req {
    body: T;
    sessionCookie?: string;
}

export type NextApiResponse<T = any> = Res<T>;

export type Handler = (req: NextApiRequest, res: NextApiResponse) => any;
