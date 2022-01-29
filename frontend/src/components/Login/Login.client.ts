import axios from "axios";
import { IdRes } from "../../client/response";
import { config } from "../../client/config";

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

export function login(body: SignInBody) {
    return axios.post<SignInRes>("/api/users/signIn", body, config);
}

export function createUser(body: CreateUser) {
    return axios.post<IdRes>("/api/users", body, config);
}