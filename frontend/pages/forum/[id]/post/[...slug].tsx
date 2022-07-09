/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { PostEntity } from "../../../../src/client/models/post";
import Banner from "../../../../src/components/Banner/Banner";
import PostPanel from "../../../../src/components/Post/PostPanel/PostPanel";
import ErrorPage from "../../../../src/components/ErrorPage/ErrorPage";
import ForumPanel from "../../../../src/components/Forum/ForumPanel/ForumPanel";
import DoubleColumn from "../../../../src/components/Util/Layout/DoubleColumn/DoubleColumn";
import { Next } from "../../../../src/utils/next";
import { urlify } from "../../../../src/utils/url";
import { CommentTreeEntity } from "../../../../src/client/models/comment";
import { fetchCommentTreeByPost } from "../../../../src/client/api/comment";
import { fetchPostById } from "../../../../src/client/api/post";
import { NextSeo } from "next-seo";

interface Props {
    post: PostEntity;
    roots: CommentTreeEntity[];
}

const PostPage: NextPage<Next<Props>> = ({ componentProps }: Next<Props>) => (
    <>
        <NextSeo title={componentProps?.post.title}/>
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

export const getServerSideProps: GetServerSideProps<Next<Props>> = async ({ query }) => {
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
        const [resPost, resTree] = await Promise.all([
            fetchPostById(postId),
            fetchCommentTreeByPost(postId)
        ]);

        const post = resPost.data.post;
        const roots = resTree.data.commentTree;

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