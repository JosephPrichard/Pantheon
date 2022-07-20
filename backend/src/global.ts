/*
 * Copyright (c) Joseph Prichard 2022.
 */

export const SESSION_EXPIRY = 86_400; // 24 hours in seconds
export const SESSION_PRUNE_PERIOD = 86_400; // 24 hours in seconds
export const MIN_COMMENT_LEN = 25;
export const MAX_COMMENT_LEN = 2_500;
export const MIN_POST_LEN = 200;
export const MAX_POST_LEN = 10_000;
export const MAX_TITLE_LEN = 100;
export const MAX_USER_DESC_LEN = 500;
export const MAX_USER_NAME_LEN = 25;
export const MAX_PASSWORD_LEN = 100;
export const MAX_LINK_LEN = 500;
export const MAX_FORUM_NAME_LEN = 25;
export const MAX_FORUM_DESC_LEN = 500;
export const MAX_ST_LEN = 100;
export const PER_PAGE = 10;
export const PER_SEARCH_PAGE = 100;
export const REFRESH_THRESHOLD = 1000 * 60 * 60 * 4; // 4 hours in milliseconds
export const SALT_ROUNDS = 12;