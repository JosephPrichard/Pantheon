/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { PostEntity } from "../../../../src/client/models/post";
import TopBanner from "../../../../src/components/Banner/TopBanner/TopBanner";
import PostPanel from "../../../../src/components/Post/PostPanel/PostPanel";
import Error from "../../../../src/components/Error/Error";
import ForumPanel from "../../../../src/components/Forum/ForumPanel/ForumPanel";
import DoubleColumn from "../../../../src/components/Util/Layout/DoubleColumn/DoubleColumn";
import { NextProps } from "../../../../src/utils/next";
import { urlify } from "../../../../src/utils/url";
import { CommentTreeEntity } from "../../../../src/client/models/comment";
import { fetchCommentTreeByPost } from "../../../../src/client/api/comment";
import { fetchPostById } from "../../../../src/client/api/post";
import { NextSeo } from "next-seo";

interface Props {
    post: PostEntity;
    roots: CommentTreeEntity[];
}

const PostPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => (
    <>
        <NextSeo title={componentProps?.post.title}/>
        {componentProps ?
            <>
                <TopBanner
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
            <Error/>
        }
    </>
);

export const getServerSideProps: GetServerSideProps<NextProps<Props>> = async ({ query }) => {
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