/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { config } from "../../client/config";
import { ForumEntity } from "../../client/models/forum";
import { UserEntity } from "../../client/models/user";
import { PostSearchEntity } from "../../client/models/post";

export interface SearchForumRes {
    forums: ForumEntity[],
    pageCount: number;
}

export interface SearchUserRes {
    users: UserEntity[],
    pageCount: number;
}
export interface SearchPostRes {
    search: PostSearchEntity[];
    pageCount: number;
}

interface Search {
    text: string;
    page: number;
}

export async function searchForums(params: Search) {
    return axios.get<SearchForumRes>(`/api/search/forums?page=${params.page}&text=${params.text}`, config);
}

export async function searchUsers(params: Search) {
    return axios.get<SearchUserRes>(`/api/search/users?page=${params.page}&text=${params.text}`, config);
}

export async function searchPosts(params: Search) {
    return axios.get<SearchPostRes>(`/api/search/posts?page=${params.page}&text=${params.text}`, config);
}