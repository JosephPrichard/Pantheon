/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { NextProps } from "../../../src/utils/next";
import TopBanner from "../../../src/components/Banner/TopBanner/TopBanner";
import Error from "../../../src/components/Error/Error";
import { ForumEntity } from "../../../src/client/models/forum";
import React from "react";
import SearchFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/SearchFeed/SearchFeed";
import { fetchForumById } from "../../../src/client/api/forum";
import { NextSeo } from "next-seo";

interface Props {
    forum: ForumEntity;
    text: string;
}

const SearchPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => {
    return (
        <>
            <NextSeo title={`Search Results: ${componentProps?.text}`}/>
            {componentProps ?
                <>
                    <TopBanner
                        title={componentProps.forum.id}
                        href={`/forum/${componentProps.forum.id}`}
                    />
                    <SearchFeed
                        text={componentProps.text}
                        forum={componentProps.forum.id}
                    />
                </>
                :
                <Error/>
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps<NextProps<Props>> = async ({ query }) => {
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