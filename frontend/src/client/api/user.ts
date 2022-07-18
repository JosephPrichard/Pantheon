/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { config, configNoCreds } from "../config";
import { UserEntity } from "../models/user";

export interface UserRes {
    user: UserEntity;
}

export interface UserUpdate {
    description: string;
}

export interface PasswordUpdate {
    password: string;
    newPassword: string;
}

export interface DeleteRes {
    userCount: number;
    postCount: number;
    commentCount: number;
}

export interface AccountDelete {
    password: string;
}

export async function fetchUserByName(name: string) {
    return await axios.get<UserRes>(`/api/users?name=${name}`, configNoCreds);
}

export async function updateUser(update: UserUpdate) {
    return await axios.put<UserRes>("/api/users", update, config);
}

export async function changePassword(update: PasswordUpdate) {
    return await axios.post<UserRes>("/api/users/resetPassword", update, config);
}

export async function deleteAccount(del: AccountDelete) {
    return await axios.post<DeleteRes>("/api/accounts/deactivate", del, config);
}