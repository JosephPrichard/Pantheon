/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ForumEntity } from "./forum";
import { UserEntity } from "./user";

export interface PostEntity {
    id: number;
    poster: UserEntity | null;
    forum: ForumEntity;
    title: string;
    votes: number;
    comments: number;
    content: string | null;
    images: string[];
    link: string | null;
    createdAt: string;
    hotRank?: number;
}

export interface PostSearchEntity {
    id: number;
    poster: null | {
        id: number;
        name: string;
    }
    forum: {
        id: string;
    }
    title: string;
    votes: number;
    comments: number;
    content: string | null;
    images: string[];
    link: string | null;
    createdAt: string;

    searchRank: number;
}

export interface CreatePostEntityRes {
    id: number;
    poster: string | null;
    forum: string;
    title: string;
    votes: number;
    comments: number;
    content: string | null;
    images: string[];
    link: string | null;
    createdAt: string;
    hotRank?: number;
}