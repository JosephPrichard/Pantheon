/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { PageProps } from "../../../src/utils/next/PageProps";
import Banner from "../../../src/components/Banner/Banner";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import axios from "axios";
import { configNoCreds } from "../../../src/client/config";
import { ForumEntity } from "../../../src/client/models/forum";
import React from "react";
import SearchFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/SearchFeed/SearchFeed";

interface Props {
    forum: ForumEntity;
    text: string;
    page: number;
}

const SearchPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => {
    return (
        <>
            {componentProps ?
                <>
                    <Banner
                        title={componentProps.forum.id}
                        href={`/forum/${componentProps.forum.id}`}
                    />
                    <SearchFeed
                        text={componentProps.text}
                        user={componentProps.forum.id}
                    />
                </>
                :
                <ErrorPage/>
            }
        </>
    );
};

interface ForumRes {
    forum: ForumEntity;
}

async function fetchForumById(id: string) {
    return await axios.get<ForumRes>(`/api/forums/${id}`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
    const forumId = query.id as string | undefined;

    if (!forumId) {
        return {
            props: {}
        };
    }

    const pageStr = query.p as string | undefined;
    let page = Number(pageStr);
    if (!page) {
        page = 1;
    }
    if (isNaN(page) || page <= 0) {
        return {
            props: {}
        };
    }

    const text = query.text as string | undefined;
    if (!text) {
        return {
            props: {}
        };
    }

    try {
        const res = await fetchForumById(forumId);
        const forum = res.data.forum;

        return {
            props: {
                componentProps: {
                    forum,
                    text,
                    page
                }
            }
        }
    } catch(err) {
        return {
            props: {}
        };
    }

}

export default SearchPage;