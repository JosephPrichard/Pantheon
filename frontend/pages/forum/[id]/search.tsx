/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { Next } from "../../../src/utils/next";
import Banner from "../../../src/components/Banner/Banner";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import { ForumEntity } from "../../../src/client/models/forum";
import React from "react";
import SearchFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/SearchFeed/SearchFeed";
import { fetchForumById } from "../../../src/client/api/forum";
import { NextSeo } from "next-seo";

interface Props {
    forum: ForumEntity;
    text: string;
}

const SearchPage: NextPage<Next<Props>> = ({ componentProps }: Next<Props>) => {
    return (
        <>
            <NextSeo title={`Search Results on ${componentProps?.forum.id}: ${componentProps?.text}`}/>
            {componentProps ?
                <>
                    <Banner
                        title={componentProps.forum.id}
                        href={`/forum/${componentProps.forum.id}`}
                    />
                    <SearchFeed
                        text={componentProps.text}
                        forum={componentProps.forum.id}
                    />
                </>
                :
                <ErrorPage/>
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Next<Props>> = async ({ query }) => {
    const forumId = query.id as string | undefined;

    if (!forumId) {
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
                    text
                }
            }
        };
    } catch(err) {
        return {
            props: {}
        };
    }

}

export default SearchPage;