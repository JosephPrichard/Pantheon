/*
 * Copyright (c) Joseph Prichard 2022.
 */


import { PostVoteEntity } from "../vote/vote.entity";

export interface SearchFilter {
    cursor?: number;
    text: string;
    date?: Date;
    poster?: string;
    forum?: string;
}

export interface SearchedPostRow {
    id: string;
    posterId: string | null;
    forumId: string;
    title: string;
    votes: number;
    comments: number;
    content: string | null;
    images: string[];
    link: string | null;
    createdAt: string;
    count: number;
    posterName: string;
    searchRank: string;
}

export interface SearchedPostRo {
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

export interface SearchedPostsRo {
    posts: SearchedPostRo[]
}

export interface SearchRo {
    postVotes: PostVoteEntity[];
    posts: SearchedPostRo[];
}