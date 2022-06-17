/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { IdRes } from "../types";
import { config } from "../config";

export interface SignInBody {
    email: string;
    password: string;
}

export interface SignInRes {
    userId: string;
    name: string;
}

export interface CreateUser {
    email: string;
    name: string;
    password: string;
}

export function signIn(body: SignInBody) {
    return axios.post<SignInRes>("/api/users/signIn", body, config);
}

export function signOut() {
    return axios.post("/api/users/signOut", {}, config);
}

export function createUser(body: CreateUser) {
    return axios.post<IdRes>("/api/users", body, config);
}

