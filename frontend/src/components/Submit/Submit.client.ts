import axios from "axios";
import { config } from "../../client/config";
import { CreatePostEntityRes } from "../../client/models/post";

export interface Submission {
    title: string;
    forum: string;
    content?: string;
    link?: string;
    images?: string[]
}

export interface FileMetaData { 
    id: string;
    path: string;
    contentType: string; 
    size: number;
}

export interface PostRes {
    post: CreatePostEntityRes;
}

export interface FileRes { 
    ids: string[];
    metaData: FileMetaData[];
}

export function submitPost(body: Submission) {
    return axios.post<PostRes>("/api/posts", body, config);
}

export function submitImages(files: File[]) {
    const formData = new FormData();
    for(const file of files) {
        formData.append(file.name, file, file.name);
    }
    return axios.post<FileRes>("/api/files/upload", formData, config);
}