/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { configNoCreds } from "../../../../src/client/config";
import { PostEntity } from "../../../../src/client/models/post";
import Banner from "../../../../src/components/Banner/Banner";
import PostPanel from "../../../../src/components/Post/PostDisplay/PostPanel/PostPanel";
import ErrorPage from "../../../../src/components/ErrorPage/ErrorPage";
import ForumPanel from "../../../../src/components/Forum/ForumPanel/ForumPanel";
import DoubleColumn from "../../../../src/components/Util/Layout/DoubleColumn/DoubleColumn";
import { PageProps } from "../../../../src/utils/next/PageProps";
import { urlify } from "../../../../src/utils/url";
import { CommentTreeEntity } from "../../../../src/client/models/comment";

interface Props {
    post: PostEntity;
    roots: CommentTreeEntity[];
}

const PostPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => (
    <>
        {componentProps ?
            <>
                <Banner
                    title={componentProps.post.forum.id}
                    href={`/forum/${componentProps.post.forum.id}`}
                />
                <DoubleColumn
                    column1={
                        <>
                            <PostPanel
                                post={componentProps.post}
                                roots={componentProps.roots}
                            />
                        </>
                    }
                    column2={
                        <>
                            <ForumPanel forum={componentProps.post.forum}/>
                        </>
                    }
                    marginBottom={30}
                />
            </>
            :
            <ErrorPage/>
        }
    </>
);

interface PostRes {
    post: PostEntity;
}

async function fetchPostById(id: string) {
    return await axios.get<PostRes>(`/api/posts/${id}`, configNoCreds);
}

interface CommentTreeRes {
    commentTree: {
        roots: CommentTreeEntity[]
    };
}

async function fetchCommentTreeByPost(id: string) {
    return await axios.get<CommentTreeRes>(`/api/feed/posts/${id}/comments`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
    const forumId = query.id as string | undefined;
    const slug = query.slug as string[] | undefined;

    if (!forumId || !slug) {
        return {
            props: {}
        };
    }

    const title = slug[1];
    const postId = slug[0];
    if (!title || !postId) {
        return {
            props: {}
        };
    }

    try {
        const resPost = await fetchPostById(postId);
        const post = resPost.data.post;

        const resTree = await fetchCommentTreeByPost(postId);
        const roots = resTree.data.commentTree.roots;

        if (forumId !== post.forum.id
            || title !== urlify(post.title)
            || !roots
        ) {
            return {
                props: {}
            };
        }

        return {
            props: {
                componentProps: {
                    post,
                    roots
                }
            }
        };
    } catch (err) {
        return {
            props: {}
        };
    }
}

export default PostPage;