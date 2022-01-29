import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { configNoCreds } from "../../../../src/client/config";
import { PostEntity } from "../../../../src/client/models/post";
import Banner from "../../../../src/components/Banner/Banner";
import PostPanel from "../../../../src/components/Post/PostDisplay/PostPanel/PostPanel";
import ErrorPage from "../../../../src/components/Error/ErrorPage";
import ForumPanel from "../../../../src/components/Forum/ForumPanel/ForumPanel";
import DoubleColumn from "../../../../src/components/Util/Layout/DoubleColumn/DoubleColumn";
import { PageProps } from "../../../../src/utils/next/PageProps";
import { urlify } from "../../../../src/utils/url";

interface Props {
    post: PostEntity;
}

const PostPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => (
    <>
        {componentProps ?
            <>
                <Banner forumId={componentProps.post.forum.id}/>
                <DoubleColumn
                    column1={
                        <>
                            <PostPanel post={componentProps.post}/>
                        </>
                    }
                    column2={
                        <>
                            <ForumPanel forum={componentProps.post.forum}/>
                        </>
                    }
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

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
    const forumId = query.id as string | undefined;
    const slug = query.slug as string[] | undefined;

    if (!forumId) {
        return {
            props: {}
        };
    }

    if (!slug) {
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
        const res = await fetchPostById(postId);
        const post = res.data.post;

        if (title !== urlify(post.title)) {
            return {
                props: {}
            };
        }

        return {
            props: {
                componentProps: {
                    post,
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