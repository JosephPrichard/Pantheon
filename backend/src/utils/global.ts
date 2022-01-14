export const SESSION_EXPIRY = 86_400; //in seconds
export const MAX_COMMENT_LEN = 2_500;
export const MAX_POST_LEN = 10_000;
export const MAX_TITLE_LEN = 50;
export const MAX_USER_DESC_LEN = 500;
export const MAX_USER_NAME_LEN = 25;
export const MAX_EMAIL_LEN = 320;
export const MAX_PASSWORD_LEN = 100;
export const MAX_PATH_LEN = 10_000;
export const MAX_LINK_LEN = 500;
export const MAX_FORUM_NAME_LEN = 25;
export const MAX_FORUM_DESC_LEN = 500;
export const MAX_MESSAGE_LEN = 300;
export const MAX_PAGE = 100;
export const MAX_ST_LEN = 100;

export type SortType = "top" | "new" | "hot";
export type TimeType = "day" | "week" | "month" | "year" | "alltime";
export const ALLTIME: TimeType = "alltime";

export const PUBLIC_CLOUD_URL = "https://storage.googleapis.com/pantheon-forum-bucket";