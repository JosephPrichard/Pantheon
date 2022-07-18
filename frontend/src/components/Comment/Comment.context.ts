/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { createContext, useContext } from "react";

interface Context {
    op?: number;
}

export const CommentContext = createContext<Context>({});
export const useCommentContext = () => useContext(CommentContext);